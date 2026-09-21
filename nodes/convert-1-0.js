module.exports = function (RED) {
    const TRUTHY_STRINGS = new Set([
        "online",
        "true",
        "on",
        "1",
        "open",
        "opened",
        "active",
    ]);

    const formatMap = {
        string: {
            name: "string (1/0)",
            convert: (isOne) => isOne ? "1" : "0",
        },
        string_on_off: {
            name: "string (ON/OFF)",
            convert: (isOne) => isOne ? "ON" : "OFF",
        },
        number: {
            name: "number (1/0)",
            convert: (isOne) => isOne ? 1 : 0,
        },
        bool: {
            name: "boolean",
            convert: (isOne) => isOne,
        },
    }

    function normalizeTo10(payload) {
        if (typeof payload === 'string') {
            const p = payload.toLowerCase().trim();
            return formatMap.string.convert(TRUTHY_STRINGS.has(p));
        }
        if (typeof payload === 'number') {
            return formatMap.number.convert(payload !== 0);
        }
        if (typeof payload === 'boolean') {
            return formatMap.bool.convert(payload);
        }
        return payload;
    }

    function Convert10Node(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const outFormat = config.outFormat || formatMap.string;
        
        config.name = config.name || formatMap[outFormat]?.name || formatMap.string.name;

        node.status({
            fill: "grey",
            shape: "dot",
            text: formatMap[outFormat]?.name || formatMap.string.name,
        });

        node.on("input", function (msg, send, done) {
            send = send || function () {
                node.send.apply(node, arguments);
            };

            msg.payload_10 = normalizeTo10(msg.payload);
            msg.payload_bool = msg.payload_10 === "1";
            msg.payload = formatMap[outFormat]?.convert?.(msg.payload_bool) || msg.payload;

            send(msg);
            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("convert-1-0", Convert10Node);
};
