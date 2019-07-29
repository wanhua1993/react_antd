function showTotal(total) {
  return `总数 ${total} 条`;
}
export function paginationConfig(total, onChange, onShowSizeChange) {
  return {
    size: 'large',
    total,
    showSizeChanger: true,
    defaultPageSize: 5,
    showQuickJumper: { goButton: '页' },
    showTotal: showTotal,
    pageSizeOptions: ['5', '10', '20', '30'],
    onShowSizeChange,
    onChange
  }
}