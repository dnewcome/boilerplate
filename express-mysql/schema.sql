create table post (
	id integer not null auto_increment primary key,
	title varchar(1000), 
	body longtext character set utf8,
	create_dt datetime not null
);

create table tag (
	id integer not null auto_increment primary key,
	name varchar(1000) not null,
	fk_postid integer not null,
	foreign key (fk_postid) references post(id)
);

