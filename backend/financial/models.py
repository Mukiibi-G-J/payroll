from django.db import models

from . import enums


class Currency(models.Model):
    code = models.CharField(max_length=10, primary_key=True, unique=True)
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Currency"
        verbose_name_plural = "Currencies"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.name}"


class GLAccount(models.Model):
    no = models.CharField(
        verbose_name="No.",
        max_length=255,
        primary_key=True,
        unique=True,
        blank=False,
        null=False,
    )
    name = models.CharField(max_length=255)
    indentation = models.IntegerField(default=0)
    income_balance = models.CharField(
        verbose_name="Income/Balance",
        max_length=255,
        choices=[(tag.value, tag.value) for tag in enums.INCOME_BALANCE],
        blank=True,
        null=True,
    )
    accountcategory = models.CharField(
        verbose_name="Account Category",
        max_length=255,
        choices=[(tag.value, tag.value) for tag in enums.G_L_Account_Category],
        blank=True,
        null=True,
    )
    debit_credit = models.CharField(
        verbose_name="Debit/Credit",
        max_length=10,
        choices=[(tag.value, tag.value) for tag in enums.DEBIT_CREDIT],
        blank=True,
        null=True,
    )
    accounttype = models.CharField(
        verbose_name="Account Type",
        max_length=255,
        choices=[(tag.value, tag.value) for tag in enums.G_L_Account_Type],
        blank=True,
        null=True,
    )
    totaling = models.CharField(
        verbose_name="Totaling", max_length=255, blank=True, null=True
    )
    direct_posting = models.BooleanField(verbose_name="Direct Posting", default=False)
    blocked = models.BooleanField(verbose_name="Blocked", default=False)

    class Meta:
        verbose_name = "G/L Account"
        verbose_name_plural = "G/L Accounts"
        ordering = ["no"]

    def __str__(self) -> str:
        return f"{self.no} - {self.name}"

    @property
    def balance(self):
        # Placeholder: depends on GeneralLedgerEntry model not defined here
        try:
            from .models_ledger import GeneralLedgerEntry  # type: ignore
        except Exception:
            return 0.0
        return (
            GeneralLedgerEntry.objects.filter(gl_account=self.no).aggregate(
                models.Sum("amount")
            )["amount__sum"]
            or 0.00
        )
