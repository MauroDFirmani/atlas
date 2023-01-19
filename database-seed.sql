CREATE DATABASE atlas;

CREATE TABLE invoices
(
    id SERIAL primary,
    fecha text not null,
    tipo text not null,
    monto text not null,
    estado text not null,
);