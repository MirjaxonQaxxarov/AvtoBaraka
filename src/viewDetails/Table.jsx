import {t} from "i18next";

// eslint-disable-next-line react/prop-types
export default function Table({data}) {
    return (
        <>
            <table>
                <tbody>
                <tr>
                    <td>{t('Chiqarilgan yili')}</td>
                    <td>{data.year}</td>
                </tr>
                <tr>
                    <td>{t('Dvigatel hajmi')}</td>
                    <td>{data.engine}</td>
                </tr>
                <tr>
                    <td>{t('Yurgan masofa')}</td>
                    <td>{data.mileage} KM</td>
                </tr>
                <tr>
                    <td>{t('Uzatuv qutisi')}</td>
                    <td>{data.transmission}</td>
                </tr>
                <tr>
                    <td>{t('Kuzov turi')}</td>
                    <td>{data.car_body}</td>
                </tr>
                <tr>
                    <td>{t('Tortuvchi tomon')}</td>
                    <td>{data.pulling_side}</td>
                </tr>
                <tr>
                    <td>{t("Yoqilg'i turi")}</td>
                    <td>{data.type_of_fuel}</td>
                </tr>
                <tr>
                    <td>{t("Bo'yoq holati")}</td>
                    <td>{data.paint_condition}</td>
                </tr>
                <tr>
                    <td>{t("Kridetga")}</td>
                    <td>{data.credit === 1 ? t('Iloji bor') : t("Iloji yo'q")}</td>
                </tr>

                </tbody>
            </table>
        </>
    )
}