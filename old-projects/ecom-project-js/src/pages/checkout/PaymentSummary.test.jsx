import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import axios from "axios";
import { PaymentSummary } from "./PayementSummary";
import userEvent from "@testing-library/user-event";

vi.mock('axios');

describe('PaymentSummary component', () => {

    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 7,
            "productCostCents": 7630,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 7630,
            "taxCents": 763,
            "totalCostCents": 8393
        }
        loadCart = vi.fn();
        user = userEvent.setup();
    })

    it('displays the correct details', () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        )

        expect(
            screen.getByText('Items (7):')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId("payment-summary-product-cost"))
                .getByText("$76.30")
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId("payment-summary-shipping-cost"))
                .getByText("$0.00")
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId("payment-summary-total-before-tax"))
                .getByText("$76.30")
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId("payment-summary-tax"))
                .getByText("$7.63")
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId("payment-summary-total"))
                .getByText("$83.93")
        ).toBeInTheDocument();
        
    })

    it('places an order', async() => {
        function Location(){
            const location = useLocation();
            return <div data-testid = "url-path">{location.pathname}</div>
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} /> 
                <Location />
            </MemoryRouter>
        )

        const placeOrderButton = screen.getByTestId("place-order-button");
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalledWith();
        expect(screen.getByTestId("url-path")).toHaveTextContent('/orders');
    })
})

