from django.contrib import admin, messages
from django.utils.safestring import mark_safe
from django.db import transaction
from django.urls import path, reverse
from django.shortcuts import redirect
import json
from pathlib import Path

from .models import GLAccount


@admin.register(GLAccount)
class GLAccountAdmin(admin.ModelAdmin):
    change_list_template = "admin/financial/glaccount/change_list.html"
    list_display = (
        "no",
        "name",
        "accounttype",
        "accountcategory",
        "direct_posting",
        "blocked",
    )
    search_fields = ("no", "name")
    list_filter = ("accounttype", "accountcategory", "direct_posting", "blocked")
    ordering = ("no",)

    actions = ["import_gl_accounts"]

    class Media:
        css = {"all": ("financial/admin.css",)}

    def _extract_first_array(self, text: str) -> str | None:
        # Extract the first top-level JSON array from arbitrary text
        start = text.find("[")
        if start == -1:
            return None
        depth = 0
        in_string = False
        escape = False
        for i in range(start, len(text)):
            ch = text[i]
            if in_string:
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == '"':
                    in_string = False
                continue
            else:
                if ch == '"':
                    in_string = True
                    continue
                if ch == "[":
                    depth += 1
                elif ch == "]":
                    depth -= 1
                    if depth == 0:
                        end = i + 1
                        return text[start:end]
        return None

    def _do_import_gl_accounts(self, request):
        json_path = Path(__file__).resolve().parent / "gl_account.json"
        if not json_path.exists():
            return (0, 0, f"File not found: {json_path}")

        text = None
        try:
            text = json_path.read_text(encoding="utf-8")
            data = json.loads(text)
        except Exception:
            # Fallback: extract the first top-level array from the file
            try:
                array_text = self._extract_first_array(text or "")
                if not array_text:
                    return (0, 0, "Failed to read JSON: No top-level array found.")
                data = json.loads(array_text)
            except Exception as exc2:
                return (0, 0, f"Failed to read JSON: {exc2}")

        if isinstance(data, dict):
            first_list = None
            for value in data.values():
                if isinstance(value, list):
                    first_list = value
                    break
            data = first_list or []

        if not isinstance(data, list):
            return (
                0,
                0,
                "JSON format not recognized. Expected a top-level list of accounts.",
            )

        created_count = 0
        updated_count = 0
        with transaction.atomic():
            for item in data:
                no = item.get("no")
                if not no:
                    continue
                defaults = {
                    "name": item.get("name") or "",
                    "indentation": item.get("indentation") or 0,
                    "income_balance": item.get("income_balance") or None,
                    "accountcategory": item.get("accountcategory") or None,
                    "debit_credit": item.get("debit_credit") or None,
                    "accounttype": item.get("accounttype") or None,
                    "totaling": item.get("totaling"),
                    "direct_posting": bool(item.get("direct_posting")),
                    "blocked": bool(item.get("blocked")),
                }
                obj, created = GLAccount.objects.update_or_create(
                    no=no, defaults=defaults
                )
                if created:
                    created_count += 1
                else:
                    updated_count += 1

        return (created_count, updated_count, None)

    @admin.action(description="Import GL Accounts from financial/gl_account.json")
    def import_gl_accounts(self, request, queryset):
        created, updated, error = self._do_import_gl_accounts(request)
        if error:
            self.message_user(request, error, level=messages.ERROR)
            return
        msg = mark_safe(
            f"Imported GL Accounts: <strong>{created} created</strong>, <strong>{updated} updated</strong>."
        )
        self.message_user(request, msg, level=messages.SUCCESS)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "import-gl/",
                self.admin_site.admin_view(self.import_gl_view),
                name="financial_glaccount_import",
            )
        ]
        return custom_urls + urls

    def import_gl_view(self, request):
        created, updated, error = self._do_import_gl_accounts(request)
        if error:
            self.message_user(request, error, level=messages.ERROR)
        else:
            msg = mark_safe(
                f"Imported GL Accounts: <strong>{created} created</strong>, <strong>{updated} updated</strong>."
            )
            self.message_user(request, msg, level=messages.SUCCESS)
        return redirect(reverse("admin:financial_glaccount_changelist"))
