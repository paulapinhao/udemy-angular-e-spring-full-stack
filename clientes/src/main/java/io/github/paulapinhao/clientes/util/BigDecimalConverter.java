package io.github.paulapinhao.clientes.util;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BigDecimalConverter {
    /* 1.000,00 -> 1000.00 */
    public BigDecimal converter(String value) {
        if (value == null) {
            return null;
        }

        value = value.replace(".", "").replace(",", ".");
        return new BigDecimal(value);
    }
}
