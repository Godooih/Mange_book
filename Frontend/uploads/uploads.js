// Serve os arquivos da pasta 'uploads' para o frontend
router.use('/uploads', express.static(uploadDir));
