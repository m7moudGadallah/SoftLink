class MonitoringController {
  /**
   * @route GET /
   * @description Monitor that server is live or not.
   * @access public
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static monitorServer(req, res) {
    res.status(200).json({
      success: true,
      message: 'Server is live! 🚀`',
    });
  }

  /**
   * @route GET /livez
   * @description Monitor that API is live! and working.
   * @access public
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static livez(req, res) {
    res.status(200).json({
      success: true,
      message: 'API is live! 🚀',
    });
  }
}

module.exports = { MonitoringController };
