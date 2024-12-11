export interface Item {
    id: number,
    title: string,
    cost: number,
    iconUrl: string,
    description: string
}

export const GetItems = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/items`;
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.status}: ${errorData.detail}`);
    }

    const data = await response.json();
    const itemsData: Item[] = data;

    return itemsData;
}