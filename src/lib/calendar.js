function calendarByName(node, name) {
  if (typeof name === 'undefined') {
    return null;
  }

  for (var cal in node.calendars) {
    if (node.calendars.hasOwnProperty(cal)) {
      if (node.calendars[cal].summary === name) {
        return node.calendars[cal];
      }
    }
  }

  return null;
}

function calendarByNameOrId(node, nameOrId) {
  return node.calendars.hasOwnProperty(nameOrId)
    ? node.calendars[nameOrId] // an id
    : calendarByName(node, nameOrId); // maybe a name
}

function calendarList(RED, node, cb) {
  node.calendars = {};
  node.google.request('https://www.googleapis.com/calendar/v3/users/me/calendarList', function (err, data) {
    if (err) {
      cb(RED._('calendar.error.fetch-failed', { message: err.toString() }));
      return;
    }

    if (data.error) {
      cb(RED._('calendar.error.fetch-failed', { message: RED.util.ensureString(data.error.message) }));
      return;
    }

    data.items.forEach((cal) => {
      if (cal.primary) {
        node.calendars.primary = cal;
      }
      node.calendars[cal.id] = cal;
    });

    cb(null);
  });
}

module.exports = {
  calendarByName,
  calendarByNameOrId,
  calendarList
}

