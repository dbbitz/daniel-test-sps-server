const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        return res.status(400).json({
            error: 'Erro de validação',
            details: error.inner.map(err => ({
                field: err.path,
                message: err.message
            }))
        });
    }
};

module.exports = validateSchema; 