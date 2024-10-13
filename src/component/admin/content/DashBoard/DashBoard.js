import TitleHeader from './TitleHeader';
import TopCard from './TopCard';
import ComposedChart from './charts/ComposedChart';
import PieChartCustomized from './charts/PieChartCustomized';
import SimpleLineChart from './charts/SimpleLineChart';
import SimpleAreaChart from './charts/SimpleAreaChart';
import SimplePieChart from './charts/SimplePieChart';
import SimpleRadarChart from './charts/SimpleRadarChart';
import SimpleBarChart from './charts/SimpleBarChart';
const DashBoard = () =>{
    return (  
        <>
            <main className='ms-auto col-10 col-xs-9 col-md-11 px-md-4 mt-2'>
             <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h1 className='h2'>Trang quản trị</h1>
               
      
            </div>
       

            <div>
              <div className='row g-4 d-flex justify-content-around'>
                <div className='col-lg-3 p-0'>
                  <TopCard title={13} text={'Bình luận'} color1={'#00A9FF'} color2={'#CDF5FD'} val1={800} val2={300} />
                </div>
                <div className='col-lg-3 p-0'>
                  <TopCard title={128} text={'Lượt xem'} color1={'#FCC8D1'} color2={'#D14D72'} val1={200} val2={1000} />
                </div>
                <div className='col-lg-3 p-0'>
                  <TopCard title={26} text={'Người dùng mới'} color1={'#E38B29'} color2={'#FFD8A9'} val1={600} val2={500} />
                </div>
              </div>

              <div className='row d-flex justify-content-around my-5'>
                <div className='col-lg-7 bg-body-tertiary shadow d-flex flex-column align-items-center justify-content-around border rounded' style={{height: '60vh'}}>
                  <h2 className='text-capitalize'>Biểu đồ</h2>
                  <ComposedChart />
                </div>

                <div className='col-lg-3 mt-5 mt-lg-0 d-flex flex-column align-items-center pt-4' style={{height: '60vh'}}>
                  <h2 className='text-capitalize'>Thị phần</h2>
                  <PieChartCustomized />
                </div>
              </div>
            </div>

          </main>
        </>
    )
}

export default DashBoard;