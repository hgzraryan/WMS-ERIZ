import React from 'react'
import  '../dist/css/IncomingOrderForm.scss';
import moment from 'moment';

function OutgoingOrdersForm({data}) {
  return (
    <article className="a4-page p-0" style={{margin:'20px'}}>
            {/* <header style={{marginBottom:'30px'}}>
                <div className="header-left">
                    <p>Էրիզ ՍՊԸ</p>
                </div>
            </header> */}
            <section className="form-section" style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                <div>
                    <p style={{fontSize:'20px'}}>ՊԱՀԵՍՏԻ ԵԼՔԻ ՕՐԴԵՐ N<span><u>{" "+data?._id}</u></span></p>
                </div>
                <div style={{lineheight:'0'}}>
                    <p>{moment(data?.createdAt).format('DD-MM-YYYY HH:mm')}</p>
                    <div className='line'></div>
                    <p>(կազմման ամսաթիվ)</p>
                </div>
            </section>
            <section className="form-section">
                <table className="main-table"  style= {{width:'100%', marginTop:'20px'}}>
                    <thead>
                        <tr>
                            <th>Ապրանքի անվանումը</th>
                            <th>Քանակ</th>
                            <th>Չափման միավոր</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.name}</td>
                            <td>10</td>
                            <td>kg</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="form-section" >
                <div style={{ marginBottom:'50px'}}>

                <div className="section" style={{display:'flex'}}>
                    <h6 style={{marginRight:'5px',marginBottom:0, alignContent:'end'}}>Ստացված է</h6><div className='line' style={{width:'80%'}}></div>
                </div>
                    <p style={{display:'flex', justifyContent:'center', alignItems:'center'}}>(անունը,ստորագրությունը)</p>
                </div>
                <div style={{ marginBottom:'50px'}}>

                <div className="section" style={{display:'flex'}}>
                    <h6 style={{marginRight:'5px',marginBottom:0, alignContent:'end'}}>Ստացման հիմքը և նպատակը</h6><div className='line' style={{width:'59%'}}></div>
                </div>
                   
                </div>
                <div style={{ marginBottom:'50px'}}>

                <div className="section" style={{display:'flex'}}>
                    <h6 style={{marginRight:'5px',marginBottom:0, alignContent:'end'}}>Գումարը</h6><div className='line' style={{width:'84%'}}></div>
                </div>
                    <p style={{display:'flex', justifyContent:'center', alignItems:'center'}}>(տառերով)</p>
                </div>
                 <div style={{ marginBottom:'50px'}}>

                <div className="section" style={{display:'flex'}}>
                    <h6 style={{marginRight:'5px',marginBottom:0, alignContent:'end'}}>Կցվում են</h6><div className='line' style={{width:'84%'}}></div>
                </div>
                    <p style={{display:'flex', justifyContent:'center', alignItems:'center'}}>(Կցվող փաստաթղթերի Էջերի թիվը)</p>
                </div>
            </section>
            <section className="form-section" style={{display:'flex', justifyContent:'space-between', }}>

                <div className="signature">
                    <p>Ուղարկող</p>
                    <p>_____________________</p>
                </div>
                <div className="signature">
                    <p>Վճարող </p>
                    <p>_____________________</p>
                </div>
                <div className="signature">
                    <p>Ստացող </p>
                    <p>_____________________</p>
                </div>
            </section>
            <footer className="footer">
            </footer>
        </article>
  )
}

export default OutgoingOrdersForm
