module.exports = function (RED) {
  'use strict';
  const {
    calendarByNameOrId,
    calendarList,
  } = require('./lib/calendar');

  function UpdateEventNode(n) {
    RED.nodes.createNode(this, n);
    this.google = RED.nodes.getNode(n.google);
    this.calendar = n.calendar || 'primary';

    if (!this.google || !this.google.credentials.accessToken) {
      this.warn(RED._('calendar.warn.no-credentials'));
      return;
    }

    const node = this;
    node.status({ fill: 'blue', shape: 'dot', text: 'calendar.status.querying' });

    calendarList(RED, node, function (err) {
      if (err) {
        node.error(err, {});
        node.status({ fill: 'red', shape: 'ring', text: 'calendar.status.failed' });
        return;
      }
      node.status({});

      node.on('input', function (msg) {
        node.status({ fill: 'blue', shape: 'dot', text: 'calendar.status.updating' });
        const cal = calendarByNameOrId(node, msg.calendar) ||
          calendarByNameOrId(node, node.calendar);

        if (!cal) {
          node.error(RED._('calendar.error.invalid-calendar'), msg);
          node.status({ fill: 'red', shape: 'ring', text: 'calendar.status.invalid-calendar' });
          return;
        }

        if (!msg.event) {
          node.error(RED._('calendar.error.invalid-id'), msg);
          node.status({ fill: 'red', shape: 'ring', text: 'calendar.status.invalid-id' });
          return;
        }

        if (typeof msg.payload !== 'object') {
          node.error(RED._('calendar.status.invalid-body'), msg);
          node.status({ fill: 'red', shape: 'ring', text: 'calendar.error.invalid-body' });
          return;
        }

        updateEvent(node, cal, msg);
      });
    });
  }

  RED.nodes.registerType('update-event', UpdateEventNode);

  function updateEvent(node, cal, msg) {
    const request = {
      method: 'PATCH',
      url: `https://www.googleapis.com/calendar/v3/calendars/${cal.id}/events/${msg.event}`,
      body: msg.payload,
      query: {
        sendUpdates: (msg.sendUpdates ? 'all' : false),
      }
    };

    node.google.request(request, function (err, data) {
      if (err) {
        node.error(err.toString(), msg);
        node.status({ fill: 'red', shape: 'ring', text: 'calendar.status.failed' });
      } else if (data.error) {
        node.error(RED.util.ensureString(data.error.message), msg);
        node.status({ fill: 'red', shape: 'ring', text: 'calendar.status.failed' });
      } else {
        node.status({ fill: 'green', shape: 'ring', text: 'calendar.status.updated' });
        msg.payload = data;
        node.send(msg);
      }
    });
  }
};
