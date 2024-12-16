import { test, expect } from '@playwright/test';
import { CONFIG } from '../config';

interface PlatziNewProductPost {
    title: string,
    price: number,
    description: string,
    category: {
        id: number,
        name: string,
        image: string,
        creationAt: string,
        updatedAt: string,
    };
    images: string[],
    id: number,
    creationAt: string,
    updatedAt: string,
}


test('should create a new product and validate response structure', async ({ request }) => {
    // Отправляем POST-запрос
    const response = await request.post(`${CONFIG.baseURL}products`, {
        data: {
            title: 'New Test Product',
            price: 199.99,
            description: 'A product for testing purposes',
            categoryId: 1,
            images: ["https://placeimg.com/640/480/any"]
        }
    });

    // Проверка статуса ответа
    expect(response.status()).toBe(201); // Успешное создание

    // Получаем JSON-ответ
    const responseData = await response.json() as PlatziNewProductPost;

    // Проверяем, что ID созданного объекта существует
    expect(responseData.id).toBeDefined();

    // Проверяем структуру ответа
    expect(responseData).toEqual(
        expect.objectContaining({
            title: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            category: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                image: expect.any(String),
                creationAt: expect.any(String),
                updatedAt: expect.any(String)
            }),
            images: expect.arrayContaining([expect.any(String)]),
            id: expect.any(Number),
            creationAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    );
});
