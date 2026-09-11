const provinceInput = document.querySelector('#province');
const zoneSelect = document.querySelector('#zone');

if (provinceInput && zoneSelect) {
  provinceInput.addEventListener('change', () => {
    const province = provinceInput.value.trim();
    if (!province) {
      zoneSelect.value = 'Seleccionar zona';
      return;
    }

    zoneSelect.disabled = false;
    zoneSelect.dataset.province = province;
  });
}
