export interface DashboardContainer {
    value: string,
    containerText: string, 
    buttonText: string,
    redirectRoute: string;
}

export interface Product {
    id: string,
    name: string,
    value: string,
    ingredients: Array<string>,
    image: string,
    qty?: string
}

export interface Order {
    id: string, 
    userId: string, 
    userName: string,
    date: string,
    phone: string,
    adress: string,
    products: Array<string>,
    payment: string,
    totalPrice: string,
    status: string
};

export interface Admin {
    id: string,
    username: string, 
    password: string
}

export interface User {
    id: string, 
    username: string,
    email: string, 
    password: string,
}

export interface BannerInformation {
    title: string,
    imageUrl: string
}

export interface AboutContainer {
    imageURL: string, 
    title: string, 
    description: string,
    buttonText: string
}

export interface Faq {
    id: number,
    title: string,
    description: string
}


