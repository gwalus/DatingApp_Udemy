export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;  // będziemy mogli tego użyć nie tylko do wyświetlania członków, ale również do np wiadomości
    pagination: Pagination;
}