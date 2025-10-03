from django.contrib import admin

from .models import Employee, ModeOfPayment


@admin.register(ModeOfPayment)
class ModeOfPaymentAdmin(admin.ModelAdmin):
    list_display = ("code", "description")
    search_fields = ("code", "description")
    ordering = ("code",)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "employeeNo",
        "name",
        "calculationScheme",
        "payrollCode",
        "modeOfPayment",
        "basicPay",
        "salaryScale",
        "scaleStep",
        "fixedPay",
    )
    search_fields = (
        "employeeNo",
        "name",
        "calculationScheme__schemeId",
        "payrollCode__code",
    )
    list_filter = ("payrollCode", "modeOfPayment")
    autocomplete_fields = (
        "calculationScheme",
        "payrollCode",
        "modeOfPayment",
        "salaryScale",
        "scaleStep",
    )
    ordering = ("employeeNo",)

    fieldsets = (
        (
            None,
            {
                "fields": ("employeeNo", "name"),
            },
        ),
        (
            "Assignments",
            {
                "fields": (("calculationScheme", "payrollCode"), ("modeOfPayment",)),
                "classes": ("gen-grid",),
            },
        ),
        (
            "Basic Pay",
            {
                "fields": (("basicPay", "fixedPay"), ("salaryScale", "scaleStep")),
                "classes": ("gen-grid",),
            },

        ),
    )

    class Media:
        css = {"all": ("financial/admin.css",)}


from django.contrib import admin

# Register your models here.
