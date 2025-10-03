from django.db import models


class Payroll(models.Model):
    code = models.CharField(max_length=20, unique=True, db_index=True)
    description = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Payroll"
        verbose_name_plural = "Payroll"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.description}"


class SalaryScale(models.Model):
    code = models.CharField(max_length=50, unique=True, db_index=True)
    description = models.CharField(max_length=255, blank=True)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="salaryScales",
        verbose_name="Payroll Code",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Salary Scale"
        verbose_name_plural = "Salary Scales"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.description}"


class SalaryScaleStep(models.Model):
    code = models.CharField(max_length=50, unique=True, db_index=True)
    scale = models.ForeignKey(
        "payroll.SalaryScale",
        on_delete=models.PROTECT,
        related_name="steps",
        verbose_name="Scale",
    )
    description = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="salaryScaleSteps",
        verbose_name="Payroll Code",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Salary Scale Step"
        verbose_name_plural = "Salary Scale Steps"
        ordering = ["scale__code", "code"]

    def __str__(self) -> str:
        return f"{self.scale.code}-{self.code}"
