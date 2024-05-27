import React, { useEffect } from 'react';
import { useToast } from '../../../components/ui/use-toast';
import { useSizeMutation } from '@/hooks/useSizeMutation';
import { getColumns } from './ColumnSize';
import { DataTable } from './DataTableSize';
import { useSizeQuery } from '@/hooks/useSizeQuery';

const ListSize = () => {
    const { toast } = useToast();
    const { data, isLoading, isError, error } = useSizeQuery();

    useEffect(() => {
        if (data) {
            console.log('API data:', data);
        }
        if (error) {
            console.error('Error:', error);
        }
    }, [data, error]);

    const { onRemove } = useSizeMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Đã xóa thành công',
                description: 'Dữ liệu sau khi xóa sẽ không thể khôi phục',
            });
        },
    });

    if (isLoading) return <div>Loading ...</div>;
    if (isError) return <div>Error ...</div>;

    const columns = getColumns(onRemove);
    const tableData = data?.data || []; // Adjusted based on your response structure

    return <DataTable columns={columns} data={tableData} />;
};

export default ListSize;
