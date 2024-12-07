export interface Hero {
    id: number,
    name: string,
    localizedName: string,
    heroPortraitUrl: string,
}

export const GetHeroes = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/heroes`;
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.status}: ${errorData.detail}`);
    }

    const data = await response.json();
    const heroesData: Hero[] = data;

    return heroesData;
}