create table if not exists admin
(
	id int unsigned auto_increment
		primary key,
	name varchar(100) not null ,
	login varchar(100) not null ,
	password varchar(500) not null
);

create table if not exists coordinate_type
(
	id int unsigned auto_increment
		primary key,
	name varchar(100) not null,
	constraint coordinate_type_name_uindex
		unique (name)
);

create table if not exists coordinate
(
	id int unsigned auto_increment
		primary key,
	name varchar(100) null,
	description varchar(300) null,
	coordinate varchar(200) not null,
	type_id int unsigned not null,
	constraint coordinate_type_fk
		foreign key (type_id) references coordinate_type (id)
);

create table if not exists job_request_status
(
	id int unsigned not null
		primary key,
	name varchar(200) not null
);

create table if not exists job_vacancy
(
	id int unsigned auto_increment
		primary key,
	name varchar(200) not null,
	image_path varchar(400) null,
	image_description varchar(300) null,
	constraint job_vacancy_name_uindex
		unique (name)
);

create table if not exists job_request
(
	id int unsigned auto_increment
		primary key,
	job_vacancy_id int unsigned not null,
	`date` datetime default current_date not null;
	`name` varchar(200) not null,
	happy_date date not null,
	phone_number int unsigned not null,
	sex tinyint(1) not null,
	email varchar(200) not null,
	resume_text varchar(800) null,
	resume_file_path varchar(400) null,
	status_id int unsigned not null,
	constraint job_request_request_status_id_fk
		foreign key (status_id) references job_request_status (id),
	constraint job_request_vacancy_id_fk
		foreign key (job_vacancy_id) references job_vacancy (id)
);

create table if not exists setting
(
	id int auto_increment
		primary key,
	`key` int not null,
	`value` varchar(500) not null,
	constraint setting_key_uindex
		unique (`key`)
);

