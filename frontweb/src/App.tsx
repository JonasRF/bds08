import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/NavBar';
import PieChartCard from './Components/pie-chart-card';
import Storefilter, { StoreFilterData } from './Components/StoreFilter';
import { buildSalesByGenderChart } from './helpers';
import { PieChartConfig } from './types/pieChartConfig';
import { SalesSummary } from './types/salesSummary';
import { requestBackend } from './utils/requests';


type ControlComponentData = {
  filterData: StoreFilterData;
}

function App() {
  const [controlComponentData, setcontrolComponentData] = useState<ControlComponentData>(
    {
      filterData: { store: null }
    }
  );

  const [salesByStore, setSalesByStore] = useState<PieChartConfig>();

  const [summary, setSummary] = useState<SalesSummary>();


  const onFilterChange = (data: StoreFilterData) => {
    setcontrolComponentData({ filterData: data })
    console.log({ data });
  };

  const getStores = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/sales/by-gender',
      params: {
        storeId: controlComponentData.filterData.store?.id
      },
    };
    requestBackend(params).then((response) => {
      const newSalesByGender = buildSalesByGenderChart(response.data);
      setSalesByStore(newSalesByGender);
    })
  }, [controlComponentData]);

  useEffect(() => {
    getStores();
  }, [getStores]);
  /////////////////////////////////////////////////////////////////////////////////
  const getSummary = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/sales/summary`,
      params: {
        storeId: controlComponentData.filterData.store?.id
      },
    };
    requestBackend(params).then((response) => {
      setSummary(response.data);
    });
  }, [controlComponentData]);

  useEffect(() => {
    getSummary();
  }, [getSummary]);

  return (
    <>
      <div className="pie-chart-card-all">
        <Navbar />
        <Storefilter onFilterChange={onFilterChange} />
        <div className="pie-chart-card-container base-card">
          <h1>{summary?.sum?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
          <span className="pie-chart-card-title">Total de vendas</span>

          <PieChartCard name='Lojas' labels={salesByStore?.labels} series={salesByStore?.series} />
        </div>
      </div>
    </>
  );
}

export default App;
