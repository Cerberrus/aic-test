create schema if not exists gross;

create table if not exists gross.admin
(
	id int unsigned auto_increment
		primary key,
	name varchar(100) not null,
	username varchar(100) not null,
	password varchar(500) not null
);

create table if not exists gross.coordinate_type
(
	id int unsigned auto_increment
		primary key,
	name varchar(100) not null,
	constraint coordinate_type_name_uindex
		unique (name)
);

create table if not exists gross.coordinate
(
	id int unsigned auto_increment
		primary key,
	latitude varchar(50) not null,
	longitude varchar(50) not null,
	type_id int unsigned not null,
	title varchar(100) null,
	constraint coordinate_type_fk
		foreign key (type_id) references coordinate_type (id)
);

create table if not exists gross.setting
(
	id int auto_increment
		primary key,
	_key varchar(500) not null,
	_value varchar(500) not null,
	private tinyint(1) default 0 null,
	constraint setting_key_uindex
		unique (_key)
);

create table if not exists gross.slider
(
	id int unsigned auto_increment
		primary key,
	title varchar(200) not null,
	image_description varchar(300) not null
);

create table if not exists gross.slider_file
(
	id int unsigned not null,
	path varchar(500) not null,
	constraint slider_file_slider_id_fk
		foreign key (id) references slider (id)
			on update cascade on delete cascade
);

create table if not exists gross.summary_status
(
	id int unsigned not null
		primary key,
	name varchar(200) not null
);

create table if not exists gross.vacancy
(
	id int unsigned auto_increment
		primary key,
	title varchar(200) not null,
	image_description varchar(300) null,
	description varchar(800) null
);

create table if not exists gross.summary
(
	id int unsigned auto_increment
		primary key,
	vacancy_id int unsigned not null,
	date datetime default CURRENT_TIMESTAMP null,
	name varchar(200) not null,
	happy_date date not null,
	phone_number varchar(50) not null,
	sex varchar(1) not null,
	email varchar(200) null,
	resume_text varchar(800) null,
	status_id int unsigned default '1' null,
	constraint job_request_request_status_id_fk
		foreign key (status_id) references summary_status (id),
	constraint job_request_vacancy_id_fk
		foreign key (vacancy_id) references vacancy (id)
);

create table if not exists gross.summary_file
(
	id int unsigned null,
	path varchar(500) null,
	constraint request_file_id_uindex
		unique (id),
	constraint request_file_job_request_id_fk
		foreign key (id) references summary (id)
			on update cascade on delete cascade
);

create table if not exists gross.vacancy_file
(
	id int unsigned not null,
	path varchar(500) not null,
	constraint vacancy_file_vacancy_id_fk
		foreign key (id) references vacancy (id)
			on update cascade on delete cascade
);

