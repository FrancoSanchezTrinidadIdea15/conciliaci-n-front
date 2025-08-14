-- CreateTable
CREATE TABLE `DownloadPackages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `downloadRequestId` INTEGER NULL,
    `packageId` VARCHAR(45) NULL,
    `downloaded` BOOLEAN NULL DEFAULT false,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DownloadRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NULL,
    `reportRequestId` INTEGER NULL,
    `requestId` VARCHAR(36) NULL,
    `startDate` DATETIME(0) NULL,
    `endDate` DATETIME(0) NULL,
    `emisor` VARCHAR(13) NULL,
    `receiver` VARCHAR(13) NULL,
    `type` VARCHAR(10) NULL,
    `retention` BOOLEAN NULL DEFAULT false,
    `estatus` INTEGER NULL DEFAULT 0,
    `codeDownload` VARCHAR(4) NULL,
    `totalDocuments` INTEGER NULL DEFAULT 0,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HoldingTaxesDocuments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `impuesto` VARCHAR(3) NULL,
    `importe` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `cfdi_id`(`cfdi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` BIGINT NULL,
    `requestFrom` DATE NULL,
    `requestUntil` DATE NULL,
    `month` INTEGER NULL,
    `year` INTEGER NULL,
    `status` INTEGER NULL DEFAULT 0,
    `failed` BOOLEAN NULL DEFAULT false,
    `requestType` ENUM('report', 'Metadata', 'CFDI', 'MetadataAndCFDI') NULL DEFAULT 'report',
    `downloadType` ENUM('issued', 'received', 'both') NULL,
    `isRetention` BOOLEAN NULL DEFAULT false,
    `expirationDate` DATETIME(0) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SequelizeMeta` (
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TraslatedTaxesDocuments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `base` DECIMAL(14, 2) NULL DEFAULT 0.00,
    `impuesto` VARCHAR(3) NULL,
    `tipoFactor` VARCHAR(10) NULL,
    `tasaOCuota` DECIMAL(10, 6) NULL,
    `importe` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `cfdi_id`(`cfdi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(250) NULL,
    `password` VARCHAR(250) NULL,
    `email` VARCHAR(250) NULL,
    `rfc` VARCHAR(20) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `rfc`(`rfc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `archivos_bancarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NOT NULL,
    `nombre_archivo` VARCHAR(255) NOT NULL,
    `hash_archivo` VARCHAR(64) NOT NULL,
    `tamano_bytes` INTEGER NOT NULL,
    `banco` ENUM('BBVA', 'SANTANDER', 'BANAMEX', 'BANORTE', 'HSBC', 'SCOTIABANK', 'INBURSA', 'AZTECA', 'OTRO') NOT NULL,
    `numero_cuenta` VARCHAR(50) NULL,
    `periodo_inicio` DATETIME(0) NULL,
    `periodo_fin` DATETIME(0) NULL,
    `saldo_inicial` DECIMAL(12, 2) NULL,
    `saldo_final` DECIMAL(12, 2) NULL,
    `total_movimientos` INTEGER NULL,
    `movimientos_procesados` INTEGER NULL,
    `errores_ocr` JSON NULL,
    `tiempo_procesamiento` INTEGER NULL,
    `paginas_procesadas` INTEGER NULL,
    `datos_metadata` JSON NULL,
    `procesado_exitosamente` BOOLEAN NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_procesamiento` DATETIME(0) NULL,

    UNIQUE INDEX `hash_archivo`(`hash_archivo`),
    INDEX `idx_archivo_banco_periodo`(`banco`, `periodo_inicio`, `periodo_fin`),
    INDEX `idx_archivo_empresa`(`empresa_id`),
    INDEX `idx_archivo_hash`(`hash_archivo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` BIGINT NULL,
    `rfc` VARCHAR(13) NULL,
    `number` VARCHAR(50) NULL,
    `issuerName` VARCHAR(500) NULL,
    `validFrom` DATETIME(0) NULL,
    `validUntil` DATETIME(0) NULL,
    `revocated` BOOLEAN NULL DEFAULT false,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complementos_nomina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `tipo_nomina` VARCHAR(3) NULL,
    `numero_dias_pagados` INTEGER NULL,
    `fecha_pago` DATE NULL,
    `fecha_inicial_periodo` DATE NULL,
    `fecha_final_periodo` DATE NULL,
    `total_percepciones_nomina` DECIMAL(12, 2) NULL,
    `total_exento` DECIMAL(12, 2) NULL,
    `total_gravado` DECIMAL(12, 2) NULL,
    `total_sueldos` DECIMAL(12, 2) NULL,
    `total_otros_pagos` DECIMAL(12, 2) NULL,
    `total_deducciones_nomina` DECIMAL(12, 2) NULL,
    `total_impuestos_retenidos` DECIMAL(12, 2) NULL,
    `total_otras_deducciones` DECIMAL(12, 2) NULL,
    `total_subsidio` DECIMAL(12, 2) NULL,
    `total_subsidio_causado` DECIMAL(12, 2) NULL,
    `total_imss` DECIMAL(12, 2) NULL,
    `total_isr` DECIMAL(12, 2) NULL,
    `total_infonavit` DECIMAL(12, 2) NULL,
    `total_aportaciones_a_retiro` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    UNIQUE INDEX `cfdi_id`(`cfdi_id`),
    INDEX `idx_fecha_pago_nomina`(`fecha_pago`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complementos_pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `objeto_impuesto_pago` BOOLEAN NULL DEFAULT true,
    `forma_pago_pago` VARCHAR(3) NULL,
    `fecha_pago_pago` DATETIME(0) NULL,
    `moneda_pago` VARCHAR(3) NULL,
    `monto_pago` DECIMAL(12, 2) NULL,
    `tipo_cambio_pago` DECIMAL(12, 2) NULL,
    `cuenta_ordenante_pago` VARCHAR(255) NULL,
    `cuenta_beneficiario_pago` VARCHAR(255) NULL,
    `total_ieps_retenciones_pago` DECIMAL(12, 2) NULL,
    `total_isr_retenciones_pago` DECIMAL(12, 2) NULL,
    `total_iva_retenciones_pago` DECIMAL(12, 2) NULL,
    `total_base_iva_exento_traslados_pago` DECIMAL(12, 2) NULL,
    `total_base_iva_0_traslados_pago` DECIMAL(12, 2) NULL,
    `total_base_iva_8_traslados_pago` DECIMAL(12, 2) NULL,
    `total_base_iva_16_traslados_pago` DECIMAL(12, 2) NULL,
    `total_impuesto_iva_0_traslados_pago` DECIMAL(12, 2) NULL,
    `total_impuesto_iva_8_traslados_pago` DECIMAL(12, 2) NULL,
    `total_impuesto_iva_16_traslados_pago` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `idx_cfdi_pago`(`cfdi_id`),
    INDEX `idx_fecha_pago`(`fecha_pago_pago`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comprobantes_fiscales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NULL,
    `version_cfdi` DECIMAL(4, 2) NULL,
    `rfc_emisor` VARCHAR(13) NULL,
    `nombre_emisor` VARCHAR(500) NULL,
    `regimen_fiscal_emisor` VARCHAR(3) NULL,
    `rfc_receptor` VARCHAR(13) NULL,
    `nombre_receptor` VARCHAR(500) NULL,
    `codigo_postal_receptor` VARCHAR(5) NULL,
    `regimen_fiscal_receptor` VARCHAR(3) NULL,
    `subtotal` DECIMAL(12, 2) NULL,
    `descuento` DECIMAL(12, 2) NULL,
    `total` DECIMAL(12, 2) NULL,
    `fecha` DATETIME(0) NULL,
    `forma_pago` VARCHAR(2) NULL,
    `metodo_pago` VARCHAR(3) NULL,
    `moneda` VARCHAR(3) NULL,
    `tipo_cambio` DECIMAL(8, 2) NULL,
    `tipo_comprobante` ENUM('I', 'E', 'T', 'N', 'P') NULL,
    `complementos` VARCHAR(150) NULL,
    `codigo_postal_expedicion` VARCHAR(6) NULL,
    `serie_cfdi` VARCHAR(25) NULL,
    `folio_cfdi` VARCHAR(40) NULL,
    `uuid` VARCHAR(36) NULL,
    `fecha_timbrado` DATETIME(0) NULL,
    `uso_cfdi` VARCHAR(3) NULL,
    `estatus_sat` BOOLEAN NULL DEFAULT true,
    `fecha_cancelacion` DATETIME(0) NULL,
    `nombre_archivo` VARCHAR(255) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    INDEX `idx_empresa_fecha`(`empresa_id`, `fecha_timbrado`),
    INDEX `idx_fecha_timbrado`(`fecha_timbrado`),
    INDEX `idx_rfc_emisor`(`rfc_emisor`),
    INDEX `idx_rfc_receptor`(`rfc_receptor`),
    INDEX `idx_tipo_comprobante`(`tipo_comprobante`),
    INDEX `idx_uuid`(`uuid`),
    UNIQUE INDEX `rfc_receptor_total_uuid_unique`(`rfc_emisor`, `rfc_receptor`, `total`, `uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conceptos_comprobantes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `clave_producto_servicio` VARCHAR(100) NULL,
    `numero_identificacion` VARCHAR(100) NULL,
    `clave_unidad` VARCHAR(100) NULL,
    `unidad` VARCHAR(50) NULL,
    `cantidad` DECIMAL(12, 2) NULL,
    `descripcion` VARCHAR(1000) NULL,
    `valor_unitario` DECIMAL(12, 2) NULL,
    `importe` DECIMAL(12, 2) NULL,
    `descuento` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `idx_cfdi_concepto`(`cfdi_id`),
    INDEX `idx_clave_producto`(`clave_producto_servicio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contribuyentes_detectados_lista_negra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NULL,
    `tipo_relacion_cfdi` TINYINT NULL DEFAULT 0,
    `rfc_detectado` VARCHAR(13) NULL,
    `razon_social_detectada` VARCHAR(500) NULL,
    `tipo_lista` VARCHAR(255) NULL,
    `nombre_lista` VARCHAR(255) NULL,
    `mes_deteccion` INTEGER NULL,
    `anio_deteccion` INTEGER NULL,
    `descripcion` TEXT NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `idx_empresa_fecha`(`empresa_id`, `mes_deteccion`, `anio_deteccion`),
    INDEX `idx_rfc_detectado`(`rfc_detectado`),
    UNIQUE INDEX `company_recibidas_rfc_date_unique`(`empresa_id`, `tipo_relacion_cfdi`, `rfc_detectado`, `mes_deteccion`, `anio_deteccion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfc_empresa` VARCHAR(13) NOT NULL,
    `nombre_empresa` VARCHAR(500) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_conversaciones_rfc_empresa`(`rfc_empresa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_relacionados_pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `uuid_cfdi_relacionado` VARCHAR(36) NULL,
    `serie_cfdi_relacionado` VARCHAR(255) NULL,
    `folio_cfdi_relacionado` VARCHAR(255) NULL,
    `moneda_cfdi_relacionado` VARCHAR(3) NULL,
    `tipo_cambio_cfdi_relacionado` DECIMAL(8, 2) NULL,
    `metodo_pago_cfdi_relacionado` VARCHAR(3) NULL,
    `numero_parcialidad` INTEGER NULL,
    `importe_saldo_anterior` DECIMAL(12, 2) NULL,
    `importe_pagado` DECIMAL(12, 2) NULL,
    `saldo_restante` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `idx_pago_documento`(`cfdi_id`, `uuid_cfdi_relacionado`),
    INDEX `idx_uuid_pagado`(`uuid_cfdi_relacionado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas_contribuyentes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfc` VARCHAR(13) NULL,
    `razon_social` VARCHAR(250) NULL,
    `correo_electronico` VARCHAR(250) NULL,
    `feccha_expiracion` DATETIME(0) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `idx_rfc`(`rfc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `impuestos_comprobante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `retencion` BOOLEAN NULL DEFAULT false,
    `base` DECIMAL(12, 2) NULL,
    `impuesto` VARCHAR(3) NULL,
    `tipoFactor` VARCHAR(10) NULL,
    `tasaOCuota` DECIMAL(10, 6) NULL,
    `importe` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `cfdi_id`(`cfdi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `impuestos_conceptos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `concepto_id` INTEGER NOT NULL,
    `tipo_impuesto` BOOLEAN NULL DEFAULT false,
    `base_gravable` DECIMAL(16, 6) NULL,
    `codigo_impuesto` VARCHAR(3) NULL,
    `tipo_factor` ENUM('Tasa', 'Cuota', 'Exento') NULL DEFAULT 'Tasa',
    `tasa_o_cuota` DECIMAL(10, 6) NULL,
    `importe_impuesto` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `cfdi_id`(`cfdi_id`),
    INDEX `idx_concepto_impuesto`(`concepto_id`, `tipo_impuesto`, `codigo_impuesto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incapacidades_nomina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `total_incapacidades` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `monto_riesgo_trabajo` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `monto_enfermedad_general` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `monto_maternidad` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `monto_licencia_cuidados_hijos` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `idx_cfdi_incapacidad`(`cfdi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lista_negra_sat_oficial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfc` VARCHAR(13) NULL,
    `nombre_razon_social` VARCHAR(255) NULL,
    `tipo_lista` VARCHAR(5) NULL,
    `supuesto` VARCHAR(50) NULL,
    `descripcion_motivo` VARCHAR(255) NULL,
    `nombre_archivo` VARCHAR(50) NULL,
    `fecha_inicio_situacion` VARCHAR(50) NULL,
    `fecha_fin_situacion` VARCHAR(50) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `rfc_index`(`rfc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mensajes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversacion_id` INTEGER NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_mensajes_conversacion_id`(`conversacion_id`),
    INDEX `idx_mensajes_timestamp`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimientos_bancarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NOT NULL,
    `fecha` DATETIME(0) NOT NULL,
    `concepto` TEXT NOT NULL,
    `monto` DECIMAL(12, 2) NOT NULL,
    `tipo` ENUM('CARGO', 'ABONO') NOT NULL,
    `referencia` VARCHAR(255) NULL,
    `saldo` DECIMAL(12, 2) NULL,
    `estado` ENUM('PENDIENTE', 'CONCILIADO', 'MANUAL', 'DESCARTADO') NULL,
    `cfdi_uuid` VARCHAR(36) NULL,
    `nivel_confianza` DECIMAL(3, 2) NULL,
    `metodo_conciliacion` ENUM('EXACTO', 'REFERENCIA', 'APROXIMADO', 'COMPLEMENTO_PPD', 'HEURISTICA', 'ML_PATRON', 'MANUAL') NULL,
    `archivo_origen_id` INTEGER NULL,
    `datos_ocr` JSON NULL,
    `notas` TEXT NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,
    `fecha_conciliacion` DATETIME(0) NULL,

    INDEX `archivo_origen_id`(`archivo_origen_id`),
    INDEX `idx_movimiento_cfdi_uuid`(`cfdi_uuid`),
    INDEX `idx_movimiento_concepto`(`concepto`(100)),
    INDEX `idx_movimiento_empresa_fecha`(`empresa_id`, `fecha`),
    INDEX `idx_movimiento_estado`(`estado`),
    INDEX `idx_movimiento_monto`(`monto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resultados_conciliacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NOT NULL,
    `archivo_bancario_id` INTEGER NULL,
    `fecha_proceso` DATETIME(0) NOT NULL,
    `periodo_inicio` DATETIME(0) NOT NULL,
    `periodo_fin` DATETIME(0) NOT NULL,
    `total_movimientos_bancarios` INTEGER NULL,
    `total_cfdis_periodo` INTEGER NULL,
    `movimientos_conciliados` INTEGER NULL,
    `movimientos_pendientes` INTEGER NULL,
    `movimientos_descartados` INTEGER NULL,
    `movimientos_manuales` INTEGER NULL,
    `conciliados_exacto` INTEGER NULL,
    `conciliados_referencia` INTEGER NULL,
    `conciliados_aproximado` INTEGER NULL,
    `conciliados_complemento_ppd` INTEGER NULL,
    `conciliados_heuristica` INTEGER NULL,
    `conciliados_ml_patron` INTEGER NULL,
    `monto_total_conciliado` DECIMAL(16, 2) NULL,
    `monto_total_pendiente` DECIMAL(16, 2) NULL,
    `nivel_confianza_promedio` DECIMAL(3, 2) NULL,
    `tiempo_procesamiento_segundos` INTEGER NULL,
    `alertas_criticas` JSON NULL,
    `sugerencias` JSON NULL,
    `configuracion_utilizada` JSON NULL,
    `errores_proceso` JSON NULL,

    INDEX `archivo_bancario_id`(`archivo_bancario_id`),
    INDEX `idx_resultado_empresa_fecha`(`empresa_id`, `fecha_proceso`),
    INDEX `idx_resultado_periodo`(`periodo_inicio`, `periodo_fin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `totales_impuestos_comprobantes_fiscales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cfdi_id` INTEGER NOT NULL,
    `total_impuestos_trasladados` DECIMAL(12, 2) NULL,
    `total_iva_trasladado` DECIMAL(12, 2) NULL,
    `total_ieps_trasladado` DECIMAL(12, 2) NULL,
    `total_impuestos_retenidos` DECIMAL(12, 2) NULL,
    `total_iva_retenido` DECIMAL(12, 2) NULL,
    `total_isr_retenido` DECIMAL(12, 2) NULL,
    `total_ieps_retenido` DECIMAL(12, 2) NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_actualizacion` DATETIME(0) NOT NULL,

    INDEX `cfdi_id`(`cfdi_id`),
    INDEX `idx_totales_monto`(`total_impuestos_trasladados`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HoldingTaxesDocuments` ADD CONSTRAINT `HoldingTaxesDocuments_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TraslatedTaxesDocuments` ADD CONSTRAINT `TraslatedTaxesDocuments_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `archivos_bancarios` ADD CONSTRAINT `archivos_bancarios_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas_contribuyentes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `complementos_nomina` ADD CONSTRAINT `complementos_nomina_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `complementos_pago` ADD CONSTRAINT `complementos_pago_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comprobantes_fiscales` ADD CONSTRAINT `comprobantes_fiscales_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas_contribuyentes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `conceptos_comprobantes` ADD CONSTRAINT `conceptos_comprobantes_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contribuyentes_detectados_lista_negra` ADD CONSTRAINT `contribuyentes_detectados_lista_negra_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas_contribuyentes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documentos_relacionados_pago` ADD CONSTRAINT `documentos_relacionados_pago_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `impuestos_comprobante` ADD CONSTRAINT `impuestos_comprobante_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `impuestos_conceptos` ADD CONSTRAINT `impuestos_conceptos_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `impuestos_conceptos` ADD CONSTRAINT `impuestos_conceptos_ibfk_2` FOREIGN KEY (`concepto_id`) REFERENCES `conceptos_comprobantes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `incapacidades_nomina` ADD CONSTRAINT `incapacidades_nomina_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mensajes` ADD CONSTRAINT `fk_mensajes_conversacion` FOREIGN KEY (`conversacion_id`) REFERENCES `conversaciones`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movimientos_bancarios` ADD CONSTRAINT `movimientos_bancarios_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas_contribuyentes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movimientos_bancarios` ADD CONSTRAINT `movimientos_bancarios_ibfk_2` FOREIGN KEY (`cfdi_uuid`) REFERENCES `comprobantes_fiscales`(`uuid`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movimientos_bancarios` ADD CONSTRAINT `movimientos_bancarios_ibfk_3` FOREIGN KEY (`archivo_origen_id`) REFERENCES `archivos_bancarios`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resultados_conciliacion` ADD CONSTRAINT `resultados_conciliacion_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas_contribuyentes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resultados_conciliacion` ADD CONSTRAINT `resultados_conciliacion_ibfk_2` FOREIGN KEY (`archivo_bancario_id`) REFERENCES `archivos_bancarios`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `totales_impuestos_comprobantes_fiscales` ADD CONSTRAINT `totales_impuestos_comprobantes_fiscales_ibfk_1` FOREIGN KEY (`cfdi_id`) REFERENCES `comprobantes_fiscales`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
