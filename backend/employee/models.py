from django.db import models


class ModeOfPayment(models.Model):
    code = models.CharField(max_length=50, unique=True, db_index=True)
    description = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Mode of Payment"
        verbose_name_plural = "Modes of Payment"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.description}"


class Employee(models.Model):
    employeeNo = models.CharField(
        max_length=50, unique=True, db_index=True, verbose_name="Employee No."
    )
    name = models.CharField(max_length=255)
    calculationScheme = models.ForeignKey(
        "payroll_setup.CalculationHeader",
        on_delete=models.PROTECT,
        related_name="employees",
        verbose_name="Calculation Scheme",
        blank=True,
        null=True,
    )
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="employees",
        verbose_name="Payroll Code",
        blank=True,
        null=True,
    )
    modeOfPayment = models.ForeignKey(
        "employee.ModeOfPayment",
        on_delete=models.PROTECT,
        related_name="employees",
        verbose_name="Mode of Payment",
        blank=True,
        null=True,
    )
    basicPay = models.CharField(
        max_length=10,
        choices=[("None", "None"), ("Fixed", "Fixed"), ("Scale", "Scale")],
        default="None",
        verbose_name="Basic Pay",
    )
    salaryScale = models.ForeignKey(
        "payroll.SalaryScale",
        on_delete=models.PROTECT,
        related_name="employees",
        verbose_name="Salary Scale",
        blank=True,
        null=True,
    )
    scaleStep = models.ForeignKey(
        "payroll.SalaryScaleStep",
        on_delete=models.PROTECT,
        related_name="employees",
        verbose_name="Scale Step",
        blank=True,
        null=True,
    )
    fixedPay = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=True, verbose_name="Fixed Pay"
    )

    class Meta:
        verbose_name = "Employee"
        verbose_name_plural = "Employees"
        ordering = ["employeeNo"]

    def __str__(self) -> str:
        return f"{self.employeeNo} - {self.name}"

    def clean(self):
        from django.core.exceptions import ValidationError

        super().clean()
        if self.basicPay == "Fixed":
            if self.fixedPay in (None,):
                raise ValidationError(
                    {"fixedPay": "Fixed Pay is required when Basic Pay is Fixed."}
                )
            if self.salaryScale or self.scaleStep:
                raise ValidationError(
                    {
                        "salaryScale": "Clear when Basic Pay is Fixed.",
                        "scaleStep": "Clear when Basic Pay is Fixed.",
                    }
                )
        elif self.basicPay == "Scale":
            if not self.salaryScale:
                raise ValidationError(
                    {"salaryScale": "Salary Scale is required when Basic Pay is Scale."}
                )
            if not self.scaleStep:
                raise ValidationError(
                    {"scaleStep": "Scale Step is required when Basic Pay is Scale."}
                )
            if self.fixedPay not in (None,):
                raise ValidationError({"fixedPay": "Clear when Basic Pay is Scale."})
        else:
            # None
            if self.fixedPay or self.salaryScale or self.scaleStep:
                raise ValidationError(
                    {
                        "basicPay": "When Basic Pay is None, Fixed Pay, Salary Scale and Scale Step must be empty."
                    }
                )
