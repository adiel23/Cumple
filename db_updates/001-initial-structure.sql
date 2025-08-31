create database cumple_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

use cumple_db;

create table `groups` (
	id int primary key not null auto_increment,
    level int not null,
    modality varchar(100) not null,
    section enum('A', 'B') not null
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table students (
	id int primary key auto_increment,
    group_id int not null,
    NIE int not null unique,
    name varchar(100) not null,
    lastname varchar(100) not null,
    foreign key (group_id) references `groups`(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table `faults` (
	id int primary key auto_increment,
    type enum('leve', 'grave', 'muy grave') not null,
    description TEXT not null
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table sanctions (
	id int primary key auto_increment,
    description TEXT not null
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table student_sanctions (
	id int primary key not null auto_increment,
	studentId int not null,
    sanctionId int not null,
    dateAssinged timestamp default current_timestamp
);

create table student_faults (
	id int primary key auto_increment,
    student_id int not null,
    fault_id int not null,
    timestamp timestamp default current_timestamp,
    foreign key (student_id) references students(id),
    foreign key (fault_id) references `faults`(id)
);

create table users (
	id int primary key auto_increment,
    username varchar(100) not null unique,
    password varchar(100) not null,
    role enum('docente', 'admin')
);