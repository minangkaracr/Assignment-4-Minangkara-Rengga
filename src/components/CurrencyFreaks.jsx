import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

export default function CurrencyFreaks(){
    const [dataCurrency, setDataCurrency] = useState([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () =>{
        try {
            const dataAPI = await fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=6f9cbd3328fd4c1498f87c0d75b46449")
            // const dataAPI = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            const result = await dataAPI.json(dataAPI)
            const collectionResult = {
                CAD: result.rates.CAD,
                IDR: result.rates.IDR,
                JPY: result.rates.JPY,
                CHF: result.rates.CHF,
                EUR: result.rates.EUR,
                GBP: result.rates.GBP,
            }
            setDataCurrency(collectionResult)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="container">
                {dataCurrency.length === 0 ? (<div className="d-flex justify-content-center"><img src="https://i.gifer.com/CVyf.gif" alt="loading" /></div>) : (
                <>
                    <div className="d-flex justify-content-center py-2" style={{ textAlign: 'center', fontSize: '40px' }}><strong>CURRENCY RATE</strong></div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th style={{ textAlign: 'center', fontSize: '36px' }}>WE BUY</th>
                                <th style={{ textAlign: 'center', fontSize: '36px' }}>EXCHANGE RATE</th>
                                <th style={{ textAlign: 'center', fontSize: '36px' }}>WE SELL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataCurrency).map((currency) => (
                                <tr key={currency}>
                                    <td style={{ textAlign: 'center', fontSize: '36px'}}><strong>{currency}</strong></td>
                                    <td style={{ textAlign: 'center', fontSize: '28px'}}>{(Number(dataCurrency[currency]) + Number(dataCurrency[currency]*0.05)).toFixed(4)}</td>
                                    <td style={{ textAlign: 'center', fontSize: '28px'}}>{(Number(dataCurrency[currency])).toFixed(4)}</td>
                                    <td style={{ textAlign: 'center', fontSize: '28px'}}>{(Number(dataCurrency[currency]) - Number(dataCurrency[currency]*0.05)).toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div>
                        <small>*based currency is USD</small>
                    </div>
                </>
                )}    
            </div>
        </>
    )
}