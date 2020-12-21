create schema if not exists gross;

create table if not exists admin
(
	id int unsigned auto_increment
		primary key,
	name varchar(100) not null,
	username varchar(100) not null,
	password varchar(500) not null
);

create table if not exists coordinate_type
(
	id int unsigned auto_increment
		primary key,
	type varchar(100) not null,
	constraint coordinate_type_name_uindex
		unique (type)
);

create table if not exists coordinate
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

create table if not exists setting
(
	id int auto_increment
		primary key,
	_key varchar(100) not null,
	_value varchar(100) not null,
	private tinyint(1) default 0 null,
	constraint setting_key_uindex
		unique (_key)
);

create table if not exists slider
(
	id int unsigned auto_increment
		primary key,
	title varchar(200) not null,
	image_description varchar(300) not null
);

create table if not exists slider_file
(
	id int unsigned not null,
	path varchar(200) not null,
	constraint slider_file_slider_id_fk
		foreign key (id) references slider (id)
			on update cascade on delete cascade
);

create table if not exists summary_status
(
	id int unsigned not null
		primary key,
	name varchar(200) not null
);

create table if not exists vacancy
(
	id int unsigned auto_increment
		primary key,
	title varchar(200) not null,
	image_description varchar(300) null,
	description varchar(300) null
);

create table if not exists summary
(
	id int unsigned auto_increment
		primary key,
	vacancy_id int unsigned not null,
	date timestamp default CURRENT_TIMESTAMP not null,
	name varchar(200) not null,
	happy_date date not null,
	phone_number varchar(50) not null,
	sex varchar(1) not null,
	email varchar(200) null,
	resume_text varchar(300) null,
	status_id int unsigned default '1' null,
	constraint job_request_request_status_id_fk
		foreign key (status_id) references summary_status (id),
	constraint job_request_vacancy_id_fk
		foreign key (vacancy_id) references vacancy (id)
);

create table if not exists summary_file
(
	id int unsigned null,
	path varchar(300) null,
	constraint request_file_id_uindex
		unique (id),
	constraint request_file_job_request_id_fk
		foreign key (id) references summary (id)
			on update cascade on delete cascade
);

create table if not exists vacancy_file
(
	id int unsigned not null,
	path varchar(300) not null,
	constraint vacancy_file_vacancy_id_fk
		foreign key (id) references vacancy (id)
			on update cascade on delete cascade
);

create table setting
(
    id      int auto_increment
        primary key,
    _key    varchar(100)         not null,
    _value  varchar(100)         not null,
    private tinyint(1) default 0 null,
    constraint setting_key_uindex
        unique (_key)
);

INSERT INTO gross.setting (id, _key, _value, private) VALUES (1, 'instagramLogin', '', 1);
INSERT INTO gross.setting (id, _key, _value, private) VALUES (2, 'instagramLoginPrivate', '', 2);
INSERT INTO gross.setting (id, _key, _value, private) VALUES (3, 'instagramPassword', '', 1);
INSERT INTO gross.setting (id, _key, _value, private) VALUES (4, 'phone', ' 7 (926) 433-14-16', 0);
INSERT INTO gross.setting (id, _key, _value, private) VALUES (5, 'policy', '<p style={{marginBottom: ''26px'', fontSize: ''18px''}}>1. Что регулирует настоящая политика конфиденциальности</p>
<p style={{marginBottom: ''48px''}}>
Настоящая политика конфиденциальности (далее — Политика) действует в отношении всей информации, включая персональные данные в понимании применимого законодательства (далее — «Персональная информация»), которую ООО «Гросс маркет» и/или его аффилированные лица, в том числе входящие в одну группу с ООО «Гросс маркет» (далее — «Гросс маркет»), могут получить о Вас в процессе использования Вами любых сайтов, программ, продуктов и/или сервисов Гросс маркет (далее вместе «Сервисы»), информацию о которых Гросс маркет может также получать Персональную информацию от своих партнеров (далее — «Партнеры»), сайты, программы, продукты или сервисы которых Вы используете (например, от рекламодателей Гросс маркет или службами такси). В таких случаях передача Персональной информации возможна только в случаях, установленных применимым законодательством, и осуществляется на основании специальных договоров между Гросс маркет и каждым из Партнеров.
<br/><br/><br/>
<span style={{color: ''#B3B3B3''}}>Пожалуйста, обратите внимание, что использование любого из Сайтов и/или Сервисов может регулироваться дополнительными условиями, которые могут вносить в настоящую Политику изменения и/или дополнения, и/или иметь специальные условия в отношении персональной информации, размещенные в соответствующих разделах документов для таких Сайтов /или Сервисов.</span>
</p>
<p style={{marginBottom: ''26px'', fontSize: ''18px''}}>2. Кто обрабатывает информацию</p>
<p style={{marginBottom: ''48px''}}>Для обеспечения использования Вами Сайтов и Сервисов Ваша Персональная информация собирается и используется Яндексом, в том числе включая общество с ограниченной ответственностью «Гросс маркет», юридическое лицо, созданное по законодательству Российской Федерации и зарегистрированное по адресу: 123351, Россия, Москва, ул. Гроссова, д. 12 (ООО «Гросс маркет»), или его аффилированным лицом, предоставляющим соответствующий Сервис в иных юрисдикциях. С информацией о том, какое лицо предоставляет тот или иной Сервис, Вы можете ознакомиться в условиях использования соответствующего Сервиса.</p>
<p style={{marginBottom: ''26px'', fontSize: ''18px''}}>3. Какова цель данной Политики</p>
<p style={{marginBottom: ''48px''}}>Защита Вашей Персональной информации и Вашей конфиденциальности чрезвычайно важны для Гросс маркета. Поэтому при использовании Вами Сайтов и Сервисов Гросс маркет защищает и обрабатывает Вашу Персональную информацию в строгом соответствии с применимым законодательством.></p>
<p style={{marginBottom: ''26px'', fontSize: ''18px''}}>4. Какую Персональную информацию о Вас собирает Гросс маркет</p>
<p>Для обеспечения использования Вами Сайтов и Сервисов Ваша Персональная информация собирается и используется Яндексом, в том числе включая общество с ограниченной ответственностью «Гросс маркет», юридическое лицо, созданное по законодательству Российской Федерации и зарегистрированное по адресу: 123351, Россия, Москва, ул. Гроссова, д. 12 (ООО «Гросс маркет»), или его аффилированным лицом, предоставляющим соответствующий Сервис в иных юрисдикциях. С информацией о том, какое лицо предоставляет тот или иной Сервис, Вы можете ознакомиться в условиях использования соответствующего Сервиса.</p>', 0);
INSERT INTO gross.summary_status (id, status) VALUES (1, 'Ожидание...');
INSERT INTO gross.summary_status (id, status) VALUES (2, 'Принято');
INSERT INTO gross.summary_status (id, status) VALUES (3, 'Отклонено');

INSERT INTO gross.coordinate_type (id, type) VALUES (1, 'физ.лица');
INSERT INTO gross.coordinate_type (id, type) VALUES (2, 'юр.лица');

