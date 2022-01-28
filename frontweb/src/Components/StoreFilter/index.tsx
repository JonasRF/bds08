import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from '../../types/store';
import { requestBackend } from '../../utils/requests';
import './styles.css';

export type StoreFilterData = {
    store?: Store | null;
}

type Props = {
    onFilterChange: (data: StoreFilterData) => void;
}

const Storefilter = ({ onFilterChange }: Props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectStore, setSelectStore] = useState<Store[]>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { setValue, getValues, control } = useForm<StoreFilterData>();

    const handleChangeStore = (value: Store) => {
        setValue('store', value);

        const obj: StoreFilterData = {
            store: getValues('store')
        }
        onFilterChange(obj);
        console.log(obj);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        requestBackend({ method: 'GET', url: '/stores' }).then((response) => {
            setSelectStore(response.data);
        });
    }, []);

    return (
        <div className="base-card base-card-store-select-filter">
            <form>
                <div className="sales-filter-store-container">
                    <Controller
                        name="store"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={selectStore}
                                isClearable
                                placeholder="Store"
                                classNamePrefix="store-filter-select"
                                getOptionLabel={(store: Store) => store.name}
                                getOptionValue={(store: Store) => String(store.id)}
                                onChange={(value) => handleChangeStore(value as Store)}
                            />
                        )}
                    />
                </div>
            </form>
        </div>
    )
};
export default Storefilter;
