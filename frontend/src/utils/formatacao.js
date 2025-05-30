// Para valores digitados (ex: 10000 vira R$ 100,00)
export const formatarMoedaDigitada = (valor) => {
    if (typeof valor !== 'string') valor = valor?.toString() || '';
    const somenteNumeros = valor.replace(/\D/g, '');
    const numero = parseFloat(somenteNumeros) / 100 || 0;
    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

// Para valores vindos do banco (ex: 100 vira R$ 100,00 sem dividir)
export const formatarMoedaBanco = (valor) => {
    const numero = parseFloat(valor) || 0;
    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};



// Converte uma string formatada como "R$ 1.234,56" para número decimal: 1234.56
export const desformatarMoeda = (valorFormatado) => {
    return parseFloat(valorFormatado.replace(/\D/g, '')) / 100 || 0;
};
