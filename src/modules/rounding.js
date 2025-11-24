export const useRoundingFilter = () => {
    const round = (value, decimals = 0, locale = 'en-US') => {
        if (!value || isNaN(value)) {
            //console.log('Invalid value', value);
            return '-';
        }

        // Convert to number and multiply by 10^decimals
        const multiplier = Math.pow(10, decimals);
        const roundedValue = Math.round(Number(value) * multiplier) / multiplier;

        // Format the number with locale-specific formatting
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(roundedValue);
    };

    return {
        round
    };
};

export const useRoundingPercentFilter = () => {
    const percent = (value, decimals = 0) => {
        if (!value || isNaN(value)) {
            return '-';
        }

        // Convert to percentage and handle decimals
        const multiplier = Math.pow(10, decimals);
        const percentValue = Number(value) * 100;
        return Math.round(percentValue * multiplier) / multiplier;
    };

    return {
        percent
    };
};
