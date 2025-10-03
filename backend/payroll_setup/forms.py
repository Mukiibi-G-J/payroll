from django import forms

from .models import CalculationScheme


class CalculationSchemeForm(forms.ModelForm):
    class Meta:
        model = CalculationScheme
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        instance = (
            self.instance if isinstance(self.instance, CalculationScheme) else None
        )

        # Default: empty queryset until we can determine scheme
        queryset = CalculationScheme.objects.none()

        if instance and instance.scheme_id:
            queryset = CalculationScheme.objects.filter(scheme=instance.scheme)
            # If current line number is known, only allow higher lines
            if instance.lineNo:
                queryset = queryset.filter(lineNo__gt=instance.lineNo)
        else:
            # Try from provided initial data
            scheme = self.initial.get("scheme") or (
                self.data.get("scheme") if hasattr(self, "data") else None
            )
            line_no = self.initial.get("lineNo") or (
                self.data.get("lineNo") if hasattr(self, "data") else None
            )
            if scheme:
                queryset = CalculationScheme.objects.filter(scheme=scheme)
                try:
                    if line_no:
                        queryset = queryset.filter(lineNo__gt=int(line_no))
                except (TypeError, ValueError):
                    pass

        self.fields["calculationLine"].queryset = queryset
