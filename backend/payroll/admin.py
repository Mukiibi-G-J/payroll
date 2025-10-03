from django.contrib import admin

from .models import Payroll, SalaryScale, SalaryScaleStep


@admin.register(Payroll)
class PayrollAdmin(admin.ModelAdmin):
    list_display = ("code", "description")
    search_fields = ("code", "description")
    ordering = ("code",)


@admin.register(SalaryScale)
class SalaryScaleAdmin(admin.ModelAdmin):
    list_display = ("code", "description", "payrollCode")
    search_fields = ("code", "description", "payrollCode__code")
    list_filter = ("payrollCode",)
    autocomplete_fields = ("payrollCode",)
    ordering = ("code",)


@admin.register(SalaryScaleStep)
class SalaryScaleStepAdmin(admin.ModelAdmin):
    list_display = ("code", "scale", "description", "amount", "payrollCode")
    search_fields = ("code", "scale__code", "description", "payrollCode__code")
    list_filter = ("scale", "payrollCode")
    autocomplete_fields = ("scale", "payrollCode")
    ordering = ("scale__code", "code")
