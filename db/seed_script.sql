INSERT INTO pushmo.pressure_ulcer_location (initials, description) VALUES ('S', 'Sacra');
INSERT INTO pushmo.pressure_ulcer_location (initials, description) VALUES ('M', 'Maleolar');
INSERT INTO pushmo.pressure_ulcer_location (initials, description) VALUES ('T', 'Troncatérica');
INSERT INTO pushmo.pressure_ulcer_location (initials, description) VALUES ('C', 'Calcânea');

INSERT INTO pushmo.pressure_ulcer_stage (initials, description) VALUES ('I', '...');
INSERT INTO pushmo.pressure_ulcer_stage (initials, description) VALUES ('II', '...');
INSERT INTO pushmo.pressure_ulcer_stage (initials, description) VALUES ('III', '...');
INSERT INTO pushmo.pressure_ulcer_stage (initials, description) VALUES ('IV', '...');

INSERT INTO pushmo.area (min, max, value) VALUES (-1, 0, 0);
INSERT INTO pushmo.area (min, max, value) VALUES (0.01, 0.3, 1);
INSERT INTO pushmo.area (min, max, value) VALUES (0.31, 0.69, 2);
INSERT INTO pushmo.area (min, max, value) VALUES (0.7, 1.09, 3);
INSERT INTO pushmo.area (min, max, value) VALUES (1.1, 2.09, 4);
INSERT INTO pushmo.area (min, max, value) VALUES (2.1, 3.09, 5);
INSERT INTO pushmo.area (min, max, value) VALUES (3.1, 4.09, 6);
INSERT INTO pushmo.area (min, max, value) VALUES (4.1, 8.09, 7);
INSERT INTO pushmo.area (min, max, value) VALUES (8.1, 12.09, 8);
INSERT INTO pushmo.area (min, max, value) VALUES (12.1, 24, 9);
INSERT INTO pushmo.area (min, max, value) VALUES (24.01, 99.99, 10);

INSERT INTO pushmo.exudato (description, value) VALUES ('Ausente', 0);
INSERT INTO pushmo.exudato (description, value) VALUES ('Pequena', 1);
INSERT INTO pushmo.exudato (description, value) VALUES ('Moderada', 2);
INSERT INTO pushmo.exudato (description, value) VALUES ('Grande', 3);

INSERT INTO pushmo.skin (description, value) VALUES ('Ferida Fechada', 0);
INSERT INTO pushmo.skin (description, value) VALUES ('Tecido Eptelial', 1);
INSERT INTO pushmo.skin (description, value) VALUES ('Tecido de Granulação', 2);
INSERT INTO pushmo.skin (description, value) VALUES ('Esfacelo', 3);
INSERT INTO pushmo.skin (description, value) VALUES ('Tecido Necrótico', 4);


INSERT INTO pushmo.feature(description) VALUES ('LEITO DA LESÃO');
INSERT INTO pushmo.feature(description) VALUES ('ÁREA PERILESÃO');
INSERT INTO pushmo.feature(description) VALUES ('BORDAS DA LESÃO');
INSERT INTO pushmo.feature(description) VALUES ('EXUDATO');
INSERT INTO pushmo.feature(description) VALUES ('CARACTERÍSTICAS');
INSERT INTO pushmo.feature(description) VALUES ('ODOR');
INSERT INTO pushmo.feature(description) VALUES ('SINAIS DE INFECÇÃO');
INSERT INTO pushmo.feature(description) VALUES ('DOR');


INSERT INTO pushmo.option (description, feature_id) VALUES ('TECIDO EPTELIAL', (SELECT id FROM pushmo.feature WHERE description = 'LEITO DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('TECIDO DE GRANULAÇÃO', (SELECT id FROM pushmo.feature WHERE description = 'LEITO DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('ESFACELO', (SELECT id FROM pushmo.feature WHERE description = 'LEITO DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('TECIDO NECRÓTICO', (SELECT id FROM pushmo.feature WHERE description = 'LEITO DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('CROSTA', (SELECT id FROM pushmo.feature WHERE description = 'LEITO DA LESÃO'));

INSERT INTO pushmo.option (description, feature_id) VALUES ('NORMAL', (SELECT id FROM pushmo.feature WHERE description = 'ÁREA PERILESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('MACERADA', (SELECT id FROM pushmo.feature WHERE description = 'ÁREA PERILESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('ERÍTEMA', (SELECT id FROM pushmo.feature WHERE description = 'ÁREA PERILESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('DERMATITE', (SELECT id FROM pushmo.feature WHERE description = 'ÁREA PERILESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('HIPERPIGMENTAÇÃO', (SELECT id FROM pushmo.feature WHERE description = 'ÁREA PERILESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('HIPEREMIA', (SELECT id FROM pushmo.feature WHERE description = 'ÁREA PERILESÃO'));

INSERT INTO pushmo.option (description, feature_id) VALUES ('EPITELIZADA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('ADERIDA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('DESLOCADA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('ERÍTEMA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('HIPEREMIA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('EPIBOLIA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('TUNELIZAÇÃO', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('QUERATOSE', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('MACERADA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('HIPERQUERATOSE', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('FIBRÓTICA', (SELECT id FROM pushmo.feature WHERE description = 'BORDAS DA LESÃO'));

INSERT INTO pushmo.option (description, feature_id) VALUES ('AUSENTE', (SELECT id FROM pushmo.feature WHERE description = 'EXUDATO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('DISCRETO', (SELECT id FROM pushmo.feature WHERE description = 'EXUDATO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('MODERADO', (SELECT id FROM pushmo.feature WHERE description = 'EXUDATO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('ACENTUADO', (SELECT id FROM pushmo.feature WHERE description = 'EXUDATO'));


INSERT INTO pushmo.option (description, feature_id) VALUES ('PURULENTA', (SELECT id FROM pushmo.feature WHERE description = 'CARACTERÍSTICAS'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('SEROSA', (SELECT id FROM pushmo.feature WHERE description = 'CARACTERÍSTICAS'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('SEROSANGUINOLENTO', (SELECT id FROM pushmo.feature WHERE description = 'CARACTERÍSTICAS'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('SANGUINOLENTO', (SELECT id FROM pushmo.feature WHERE description = 'CARACTERÍSTICAS'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('PIOSANGUINOLENTO', (SELECT id FROM pushmo.feature WHERE description = 'CARACTERÍSTICAS'));

INSERT INTO pushmo.option (description, feature_id) VALUES ('SIM', (SELECT id FROM pushmo.feature WHERE description = 'ODOR'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('NAO', (SELECT id FROM pushmo.feature WHERE description = 'ODOR'));

INSERT INTO pushmo.option (description, feature_id) VALUES ('SIM', (SELECT id FROM pushmo.feature WHERE description = 'SINAIS DE INFECÇÃO'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('NAO', (SELECT id FROM pushmo.feature WHERE description = 'SINAIS DE INFECÇÃO'));

INSERT INTO pushmo.option (description, feature_id) VALUES ('SIM', (SELECT id FROM pushmo.feature WHERE description = 'DOR'));
INSERT INTO pushmo.option (description, feature_id) VALUES ('NAO', (SELECT id FROM pushmo.feature WHERE description = 'DOR'));
