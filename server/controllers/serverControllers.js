const serverCheck = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Server is running smoothly!'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
        });
    }
}

module.exports = {
    serverCheck,
}