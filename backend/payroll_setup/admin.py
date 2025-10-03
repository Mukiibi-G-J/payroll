from django.contrib import admin

from .models import (
    CalculationHeader,
    CalculationScheme,
    EdDefinition,
    EdPostingGroup,
    EmployeePostingGroup,
    PayslipGroup,
    PayrollPostingSetup,
)
from .forms import CalculationSchemeForm


@admin.register(PayslipGroup)
class PayslipGroupAdmin(admin.ModelAdmin):
    list_display = ("code", "headingText", "payrollCode")
    search_fields = ("code", "headingText", "payrollCode__code")
    list_filter = ("payrollCode",)
    autocomplete_fields = ("payrollCode",)
    ordering = ("code",)


@admin.register(CalculationScheme)
class CalculationSchemeAdmin(admin.ModelAdmin):
    form = CalculationSchemeForm
    list_display = (
        "scheme",
        "lineNo",
        "description",
        "Input",
        "payrollEntry",
        "calculation",
        "roundType",
        "roundPrecision",
        "calculationLine",
        "calculateTo",
        "divideMultiply",
        "lookUp",
        "payrollLines",
    )
    search_fields = (
        "description",
        "lineNo",
        "scheme__schemeId",
        "Input",
        "payrollEntry__edCode",
    )
    list_filter = ("scheme", "calculation")
    autocomplete_fields = ("scheme", "calculationLine", "payrollEntry", "payrollLines")
    ordering = ("scheme", "lineNo")

    fieldsets = (
        (
            None,
            {
                "fields": ("scheme", "lineNo", "description"),
            },
        ),
        (
            "Input",
            {
                "fields": (("Input", "calculationLine"), ("payrollEntry",)),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Round",
            {
                "fields": (("roundType", "roundPrecision"),),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Calculation",
            {
                "fields": (
                    ("calculation", "calculateTo"),
                    ("divideMultiply", "lookUp"),
                ),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Output",
            {
                "fields": (("payrollLines",),),
            },
        ),
    )

    class Media:
        css = {"all": ("payroll_setup/admin.css",)}


class CalculationSchemeInline(admin.StackedInline):
    model = CalculationScheme
    extra = 0
    form = CalculationSchemeForm
    autocomplete_fields = ("calculationLine", "payrollEntry")
    fieldsets = (
        (
            None,
            {
                "fields": ("lineNo", "scheme", "description"),
            },
        ),
        (
            "Input",
            {
                "fields": (("Input", "calculationLine", "payrollEntry"),),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Round",
            {
                "fields": (("roundType", "roundPrecision"),),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Calculation",
            {
                "fields": (
                    ("calculation", "calculateTo"),
                    ("divideMultiply", "lookUp"),
                ),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Output",
            {
                "fields": (("payrollLines",),),
            },
        ),
    )

    class Media:
        css = {"all": ("payroll_setup/admin.css",)}


@admin.register(CalculationHeader)
class CalculationHeaderAdmin(admin.ModelAdmin):
    list_display = ("schemeId", "description", "payrollCode")
    search_fields = ("schemeId", "description", "payrollCode__code")
    list_filter = ("payrollCode",)
    autocomplete_fields = ("payrollCode",)
    ordering = ("schemeId",)
    inlines = [CalculationSchemeInline]


@admin.register(EdPostingGroup)
class EdPostingGroupAdmin(admin.ModelAdmin):
    list_display = ("edPostingGroup", "description", "payrollCode")
    search_fields = ("edPostingGroup", "description", "payrollCode__code")
    list_filter = ("payrollCode",)
    ordering = ("edPostingGroup",)


@admin.register(EmployeePostingGroup)
class EmployeePostingGroupAdmin(admin.ModelAdmin):
    list_display = ("postingGroup", "description", "payrollCode")
    search_fields = ("postingGroup", "description", "payrollCode__code")
    list_filter = ("payrollCode",)
    ordering = ("postingGroup",)


@admin.register(EdDefinition)
class EdDefinitionAdmin(admin.ModelAdmin):
    list_display = (
        "edCode",
        "description",
        "payslipText",
        "calculationGroup",
        "postingType",
        "debitCredit",
        "payslipGroup",
        "edPostingGroup",
        "payrollCode",
    )
    search_fields = (
        "edCode",
        "description",
        "payslipText",
        "payslipGroup__code",
        "payslipGroup__headingText",
        "edPostingGroup__edPostingGroup",
        "edPostingGroup__description",
        "payrollCode__code",
        "payrollCode__description",
    )
    list_filter = (
        "calculationGroup",
        "postingType",
        "debitCredit",
        "payslipGroup",
        "edPostingGroup",
        "payrollCode",
    )
    autocomplete_fields = ("payslipGroup", "edPostingGroup", "payrollCode")
    ordering = ("edCode",)

    fieldsets = (
        (
            "Basic",
            {
                "fields": (
                    "edCode",
                    "description",
                )
            },
        ),
        (
            "General",
            {
                "fields": (
                    ("payslipText", "calculationGroup"),
                    ("postingType", "debitCredit"),
                    ("payslipGroup", "edPostingGroup"),
                    ("payrollCode",),
                ),
                "classes": ("gen-grid",),
            },
        ),
    )

    class Media:
        css = {"all": ("payroll_setup/admin.css",)}


@admin.register(PayrollPostingSetup)
class PayrollPostingSetupAdmin(admin.ModelAdmin):
    list_display = (
        "employeePostingGroup",
        "edPostingGroup",
        "debitAccount",
        "creditAccount",
    )
    search_fields = (
        "employeePostingGroup__postingGroup",
        "employeePostingGroup__description",
        "edPostingGroup__edPostingGroup",
        "edPostingGroup__description",
        "debitAccount__no",
        "debitAccount__name",
        "creditAccount__no",
        "creditAccount__name",
    )
    list_filter = (
        "employeePostingGroup",
        "edPostingGroup",
    )
    autocomplete_fields = (
        "employeePostingGroup",
        "edPostingGroup",
        "debitAccount",
        "creditAccount",
    )
    fieldsets = (
        (
            None,
            {
                "fields": (
                    ("employeePostingGroup", "edPostingGroup"),
                    ("debitAccount", "creditAccount"),
                ),
                "classes": ("gen-grid",),
            },
        ),
    )

    class Media:
        css = {"all": ("payroll_setup/admin.css",)}
