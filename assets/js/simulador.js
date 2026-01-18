/* ===============================================
   SIMULADOR DE EMPRÉSTIMO - JAVASCRIPT
   Calcula juros e total em tempo real
   =============================================== */

// ========================================
// 1. SELETORES DOM
// ========================================

// MOBILE
const valorSliderMobile = document.getElementById('valor-slider-mobile');
const prazoSliderMobile = document.getElementById('prazo-slider-mobile');
const valorDisplayMobile = document.getElementById('valor-display-mobile');
const prazoDisplayMobile = document.getElementById('prazo-display-mobile');
const totalDisplayMobile = document.getElementById('total-mobile');
const jurosDisplayMobile = document.getElementById('juros-mobile');

// DESKTOP
const valorSliderDesktop = document.getElementById('valor-slider-desktop');
const prazoSliderDesktop = document.getElementById('prazo-slider-desktop');
const valorDisplayDesktop = document.getElementById('valor-display-desktop');
const prazoDisplayDesktop = document.getElementById('prazo-display-desktop');
const totalDisplayDesktop = document.getElementById('total-desktop');
const jurosDisplayDesktop = document.getElementById('juros-desktop');


// ========================================
// 2. FUNÇÃO DE CÁLCULO (FÓRMULA FAKE CONSISTENTE)
// ========================================

function calcularEmprestimo(valor, dias) {
  // TAXAS BASE
  const taxaBase = 0.05; // 5% fixo
  
  // TAXA POR PRAZO (quanto mais dias, mais juros)
  const taxaPrazo = (dias / 360) * 0.20; // Até 20% adicional
  
  // TAXA POR VALOR (quanto mais dinheiro, mais juros)
  const taxaValor = (valor / 250000) * 0.15; // Até 15% adicional
  
  // TAXA TOTAL
  const taxaTotal = taxaBase + taxaPrazo + taxaValor;
  
  // CÁLCULO
  const juros = Math.round(valor * taxaTotal);
  const total = valor + juros;
  
  return { juros, total };
}


// ========================================
// 3. FUNÇÃO DE FORMATAÇÃO
// ========================================

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-AO') + ' Kz';
}


// ========================================
// 4. FUNÇÃO DE ATUALIZAÇÃO
// ========================================

function atualizarCalculos(valor, dias, isMobile = true) {
  // Calcular
  const { juros, total } = calcularEmprestimo(valor, dias);
  
  // Formatar
  const valorFormatado = formatarMoeda(valor);
  const prazoFormatado = dias + ' Dias';
  const jurosFormatado = formatarMoeda(juros);
  const totalFormatado = formatarMoeda(total);
  
  // Atualizar DOM
  if (isMobile) {
    valorDisplayMobile.textContent = valorFormatado;
    prazoDisplayMobile.textContent = prazoFormatado;
    jurosDisplayMobile.textContent = jurosFormatado;
    totalDisplayMobile.textContent = totalFormatado;
  } else {
    valorDisplayDesktop.textContent = valorFormatado;
    prazoDisplayDesktop.textContent = prazoFormatado;
    jurosDisplayDesktop.textContent = jurosFormatado;
    totalDisplayDesktop.textContent = totalFormatado;
  }
  
  // Atualizar barra de progresso visual do slider
  atualizarProgressoSlider(isMobile ? valorSliderMobile : valorSliderDesktop);
  atualizarProgressoSlider(isMobile ? prazoSliderMobile : prazoSliderDesktop);
}


// ========================================
// 5. FUNÇÃO DE PROGRESSO VISUAL DO SLIDER
// ========================================

function atualizarProgressoSlider(slider) {
  const min = slider.min;
  const max = slider.max;
  const val = slider.value;
  const percentage = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--value', percentage + '%');
}


// ========================================
// 6. EVENT LISTENERS - MOBILE
// ========================================

if (valorSliderMobile && prazoSliderMobile) {
  valorSliderMobile.addEventListener('input', function() {
    const valor = parseInt(this.value);
    const prazo = parseInt(prazoSliderMobile.value);
    atualizarCalculos(valor, prazo, true);
  });

  prazoSliderMobile.addEventListener('input', function() {
    const valor = parseInt(valorSliderMobile.value);
    const prazo = parseInt(this.value);
    atualizarCalculos(valor, prazo, true);
  });
}


// ========================================
// 7. EVENT LISTENERS - DESKTOP
// ========================================

if (valorSliderDesktop && prazoSliderDesktop) {
  valorSliderDesktop.addEventListener('input', function() {
    const valor = parseInt(this.value);
    const prazo = parseInt(prazoSliderDesktop.value);
    atualizarCalculos(valor, prazo, false);
  });

  prazoSliderDesktop.addEventListener('input', function() {
    const valor = parseInt(valorSliderDesktop.value);
    const prazo = parseInt(this.value);
    atualizarCalculos(valor, prazo, false);
  });
}


// ========================================
// 8. INICIALIZAÇÃO (CÁLCULO INICIAL)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar Mobile (se existir)
  if (valorSliderMobile && prazoSliderMobile) {
    const valorInicial = parseInt(valorSliderMobile.value);
    const prazoInicial = parseInt(prazoSliderMobile.value);
    atualizarCalculos(valorInicial, prazoInicial, true);
  }
  
  // Inicializar Desktop (se existir)
  if (valorSliderDesktop && prazoSliderDesktop) {
    const valorInicial = parseInt(valorSliderDesktop.value);
    const prazoInicial = parseInt(prazoSliderDesktop.value);
    atualizarCalculos(valorInicial, prazoInicial, false);
  }
  
  console.log('✅ Simulador de Empréstimo inicializado!');
});


// ========================================
// 9. EXEMPLO DE FÓRMULA DE CÁLCULO
// ========================================

/*
EXEMPLO DE CÁLCULO:
Valor: 150.000 Kz
Prazo: 180 dias

Taxa Base: 5%
Taxa Prazo: (180/360) * 20% = 10%
Taxa Valor: (150000/250000) * 15% = 9%
Taxa Total: 5% + 10% + 9% = 24%

Juros: 150.000 * 0.24 = 36.000 Kz
Total: 150.000 + 36.000 = 186.000 Kz

Esta fórmula é FAKE mas gera resultados consistentes e realistas!
*/