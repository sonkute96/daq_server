use master
go
create database daq
go
use daq
go
create table recevie_data (
	ID INT NOT NULL,
	receive_time TIME NOT NULL,
	value INT NOT NULL,
	count_time INT NOT NULL
	primary key (ID)
);