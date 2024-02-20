// @ts-ignore
export const markFormGroupTouched = (formGroup) => {
  // @ts-ignore
  (Object as any).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
};
