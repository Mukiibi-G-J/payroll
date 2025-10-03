from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.


class PayslipGroup(models.Model):
    code = models.CharField(max_length=20, unique=True, db_index=True)
    headingText = models.CharField(max_length=255)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="payslipGroups",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Payslip Group"
        verbose_name_plural = "Payslip Groups"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.headingText}"


class CalculationHeader(models.Model):
    schemeId = models.CharField(
        max_length=50, unique=True, db_index=True, verbose_name="Scheme ID"
    )
    description = models.CharField(max_length=255)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="calculationHeaders",
    )

    class Meta:
        verbose_name = "Calculation Header"
        verbose_name_plural = "Calculation Headers"
        ordering = ["schemeId"]

    def __str__(self) -> str:
        return f"{self.schemeId} - {self.description}"


class EdPostingGroup(models.Model):
    edPostingGroup = models.CharField(max_length=50, unique=True, db_index=True)
    description = models.CharField(max_length=255)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="edPostingGroups",
    )

    class Meta:
        verbose_name = "ED Posting Group"
        verbose_name_plural = "ED Posting Groups"
        ordering = ["edPostingGroup"]

    def __str__(self) -> str:
        return f"{self.edPostingGroup} - {self.description}"


class EmployeePostingGroup(models.Model):
    postingGroup = models.CharField(max_length=50, unique=True, db_index=True)
    description = models.CharField(max_length=255)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="employeePostingGroups",
    )

    class Meta:
        verbose_name = "Employee Posting Group"
        verbose_name_plural = "Employee Posting Groups"
        ordering = ["postingGroup"]

    def __str__(self) -> str:
        return f"{self.postingGroup} - {self.description}"


class EdDefinition(models.Model):
    edCode = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        help_text="ED stands for Earnings and Deductions.",
    )
    description = models.CharField(max_length=255)
    payslipText = models.CharField(max_length=255, blank=True)
    calculationGroup = models.CharField(
        max_length=32,
        choices=[
            ("None", "None"),
            ("Payments", "Payments"),
            ("Benefit non cash", "Benefit non cash"),
            ("Deduction", "Deduction"),
        ],
        default="None",
    )
    postingType = models.CharField(
        max_length=32,
        choices=[
            ("None", "None"),
            ("G/L Account", "G/L Account"),
            ("Direct", "Direct"),
            ("Customer", "Customer"),
            ("Vendor", "Vendor"),
        ],
        default="None",
    )
    debitCredit = models.CharField(
        max_length=10,
        choices=[("Debit", "Debit"), ("Credit", "Credit")],
        blank=True,
        null=True,
        verbose_name="Debit/Credit",
    )
    payslipGroup = models.ForeignKey(
        "PayslipGroup",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="edDefinitions",
    )
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="edDefinitions",
    )
    edPostingGroup = models.ForeignKey(
        "EdPostingGroup",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="edDefinitions",
    )

    class Meta:
        verbose_name = "ED Definition"
        verbose_name_plural = "ED Definitions"
        ordering = ["edCode"]

    def __str__(self) -> str:
        return f"{self.edCode} - {self.description}"


class PayrollPostingSetup(models.Model):
    employeePostingGroup = models.ForeignKey(
        "EmployeePostingGroup",
        on_delete=models.PROTECT,
        related_name="payrollPostingSetups",
    )
    edPostingGroup = models.ForeignKey(
        "EdPostingGroup",
        on_delete=models.PROTECT,
        related_name="payrollPostingSetups",
    )
    debitAccount = models.ForeignKey(
        "financial.GLAccount",
        on_delete=models.PROTECT,
        related_name="debitPayrollPostingSetups",
        verbose_name="Debit Account",
        blank=True,
        null=True,
    )
    creditAccount = models.ForeignKey(
        "financial.GLAccount",
        on_delete=models.PROTECT,
        related_name="creditPayrollPostingSetups",
        verbose_name="Credit Account",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Payroll Posting Setup"
        verbose_name_plural = "Payroll Posting Setups"
        unique_together = (
            (
                "employeePostingGroup",
                "edPostingGroup",
            ),
        )

    def __str__(self) -> str:
        return f"{self.employeePostingGroup} / {self.edPostingGroup}"


class Lookup(models.Model):
    code = models.CharField(max_length=50, primary_key=True, unique=True)
    description = models.CharField(max_length=255, blank=True)
    localServiceTax = models.BooleanField(
        default=False, verbose_name="Local Service Tax"
    )
    type = models.CharField(
        max_length=20,
        choices=[
            ("Percentage", "Percentage"),
            ("Extract Amount", "Extract Amount"),
            ("Month", "Month"),
            ("Max Min", "Max Min"),
            ("Special", "Special"),
        ],
        verbose_name="Type",
    )
    minExtractAmountLCY = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="Min Extract Amount (LCY)",
    )
    maxExtractAmountLCY = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="Max Extract Amount (LCY)",
    )
    currencyCode = models.ForeignKey(
        "financial.Currency",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        to_field="code",
        verbose_name="Currency Code",
    )
    payee = models.BooleanField(default=False)
    payrollCode = models.ForeignKey(
        "payroll.Payroll",
        on_delete=models.PROTECT,
        related_name="lookups",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Lookup"
        verbose_name_plural = "Lookups"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.description}"


class CalculationScheme(models.Model):
    lineNo = models.PositiveIntegerField(verbose_name="Line No.")
    description = models.CharField(max_length=255)
    scheme = models.ForeignKey(
        "CalculationHeader",
        on_delete=models.CASCADE,
        related_name="schemeLines",
        verbose_name="Scheme",
    )
    Input = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name="Input",
        choices=[
            ("None", "None"),
            ("Calculation Line", "Calculation Line"),
            ("Payroll Entry", "Payroll Entry"),
        ],
        default="None",
    )
    payrollEntry = models.ForeignKey(
        "EdDefinition",
        on_delete=models.PROTECT,
        related_name="calculationSchemes",
        verbose_name="Payroll Entry",
        blank=True,
        null=True,
    )
    calculation = models.CharField(
        max_length=20,
        choices=[
            ("None", "None"),
            ("Add", "Add"),
            ("Subtract", "Subtract"),
            ("Multiply", "Multiply"),
            ("Divide", "Divide"),
            ("Percent", "Percent"),
            ("Highest", "Highest"),
            ("Lowest", "Lowest"),
            ("Look Up", "Look Up"),
        ],
        default="None",
        verbose_name="Calculation",
    )
    roundType = models.CharField(
        max_length=10,
        choices=[
            ("None", "None"),
            ("Up", "Up"),
            ("Down", "Down"),
            ("Nearest", "Nearest"),
        ],
        default="Nearest",
        verbose_name="Round",
    )
    roundPrecision = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1.00,
        verbose_name="Round Precision",
    )

    calculationLine = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="calculationLines",
        verbose_name="Calculation Line",
    )

    calculateTo = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="calculatedFrom",
        verbose_name="Calculate To",
    )
    divideMultiply = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.0,
        verbose_name="Divide/Multiply",
    )
    lookUp = models.ForeignKey(
        "Lookup",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="calculationSchemes",
        verbose_name="LookUp",
    )
    payrollLines = models.ForeignKey(
        "EdDefinition",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="outputCalculationSchemes",
        verbose_name="Payroll Lines",
    )

    class Meta:
        verbose_name = "Calculation Scheme Line"
        verbose_name_plural = "Calculation Scheme Lines"
        ordering = ["scheme", "lineNo"]
        unique_together = (("scheme", "lineNo"),)

    def clean(self):
        super().clean()
        # Conditional requirements based on Input selection
        if self.Input == "Calculation Line":
            if not self.calculationLine:
                raise ValidationError(
                    {"calculationLine": "Required when Input is 'Calculation Line'."}
                )
            if self.payrollEntry:
                raise ValidationError(
                    {"payrollEntry": "Clear this when Input is 'Calculation Line'."}
                )
            # Validate reference line belongs to same scheme and is higher
            if self.calculationLine.scheme_id != self.scheme_id:
                raise ValidationError(
                    {"calculationLine": "Must reference a line in the same Scheme."}
                )
            if self.calculationLine.lineNo <= self.lineNo:
                raise ValidationError(
                    {"calculationLine": "Line number must be higher than current line."}
                )
        elif self.Input == "Payroll Entry":
            if not self.payrollEntry:
                raise ValidationError(
                    {"payrollEntry": "Required when Input is 'Payroll Entry'."}
                )
            if self.calculationLine:
                raise ValidationError(
                    {"calculationLine": "Clear this when Input is 'Payroll Entry'."}
                )
        else:
            # Input == None
            if self.calculationLine or self.payrollEntry:
                raise ValidationError(
                    {
                        "Input": "When Input is 'None', both Payroll Entry and Calculation Line must be empty.",
                    }
                )

    def __str__(self) -> str:
        return f"{self.scheme.schemeId} - {self.lineNo}: {self.description}"
