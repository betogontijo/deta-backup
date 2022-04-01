const url = {
  DRIVE: `https://:host/v1/:project_id/:drive_name`,
};

/**
 * drive function returns API URL for drive
 *
 * @param {string} [host]
 * @returns {string}
 */
function drive(host?: string): string {
  const hostPath =
    host?.trim() || process.env.DETA_DRIVE_HOST?.trim() || 'drive.deta.sh';
  return url.DRIVE.replace(':host', hostPath);
}

export default {
  drive,
};
