USE AJOVECO_NE;

DROP TABLE Pedidos;
DROP TABLE Productos;
DROP TABLE Usuarios;
GO

CREATE TABLE Usuarios (
    UsuID int IDENTITY(1, 1) PRIMARY KEY,
    UsuNombre varchar(50),
    UsuPass varchar(256)
);

CREATE TABLE Productos (
    ProID int IDENTITY(1, 1) PRIMARY KEY,
    ProDesc varchar(50),
    ProValor money
);

CREATE TABLE Pedidos (
    PedID int IDENTITY(1, 1) PRIMARY KEY,
    PedUsu int REFERENCES Usuarios(UsuID),
    PedPro int REFERENCES Productos(ProID),
	PedVrUnit money,
	PedCant float,
	PedSubtot money,
	PedIVA float,
	PedTotal money
);	

SET IDENTITY_INSERT Usuarios ON;

