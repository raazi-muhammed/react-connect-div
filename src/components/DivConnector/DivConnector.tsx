import React from "react";

enum OriginTypes {
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export default function DivConnector({
    to,
    from,
    refreshWhen,
    container,
    borderWidth = 3,
    borderColor = "#44464C",
}: {
    to: string;
    from: string;
    container?: string;
    refreshWhen?: any;
    borderWidth?: number;
    borderColor?: string;
}) {
    const [position, setPosition] = React.useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const [origin, setOrigin] = React.useState<OriginTypes>(
        OriginTypes.TOP_LEFT
    );

    React.useEffect(() => {
        try {
            const fromElem = document.querySelector(from);
            const toElem = document.querySelector(to);

            if (!fromElem || !toElem) {
                console.log("invalid to or from elem");
                return;
            }

            const fromBounding = fromElem.getBoundingClientRect();
            const toBounding = toElem.getBoundingClientRect();

            const xPosition = fromBounding.x + fromBounding.width / 2;
            const yPosition = fromBounding.y + fromBounding.height / 2;

            let newPosition = {
                width: Math.abs(
                    toBounding.x -
                        fromBounding.x -
                        fromBounding.width / 2 +
                        toBounding.width / 2
                ),
                height: Math.abs(
                    toBounding.y -
                        fromBounding.y -
                        fromBounding.height / 2 +
                        toBounding.height / 2
                ),
                x: xPosition,
                y: yPosition,
            };

            const isHeightNegative = toBounding.y - fromBounding.y < 0;
            const isWidthNegative = toBounding.x - fromBounding.x < 0;

            if (isHeightNegative) {
                if (isWidthNegative) setOrigin(OriginTypes.BOTTOM_RIGHT);
                else setOrigin(OriginTypes.BOTTOM_LEFT);
            } else {
                if (isWidthNegative) setOrigin(OriginTypes.TOP_RIGHT);
                else setOrigin(OriginTypes.TOP_LEFT);
            }

            if (container) {
                const containerElem = document.querySelector(container);
                if (!containerElem) {
                    console.log("no container elem found");
                    return;
                }
                const containerBounding = containerElem.getBoundingClientRect();

                newPosition = {
                    ...newPosition,
                    x: newPosition.x - containerBounding.x,
                    y: newPosition.y - containerBounding.y,
                };
            }

            setPosition(newPosition);
        } catch (error) {
            console.log(error);
        }
    }, [refreshWhen]);

    return (
        <>
            {origin == OriginTypes.BOTTOM_LEFT ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                        pointerEvents: "none",
                    }}>
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 ${position.height} Q${position.width / 2} ${
                                position.height
                            } ${position.width / 2} ${position.height / 2} Q${
                                position.width / 2
                            } 0 ${position.width} 0
                             m${position.width} 0 Z`}
                            stroke={borderColor}
                            strokeWidth={borderWidth}
                            fill="none"
                        />
                    </svg>
                </div>
            ) : origin == OriginTypes.TOP_RIGHT ? (
                <div
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x - position.width}px`,
                        position: "absolute",
                        pointerEvents: "none",
                    }}>
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 ${position.height} Q${position.width / 2} ${
                                position.height
                            } ${position.width / 2} ${position.height / 2} Q${
                                position.width / 2
                            } 0 ${position.width} 0
                             m${position.width} 0 Z`}
                            stroke={borderColor}
                            strokeWidth={borderWidth}
                            fill="none"
                        />
                    </svg>
                </div>
            ) : origin == OriginTypes.BOTTOM_RIGHT ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x - position.width}px`,
                        position: "absolute",
                        pointerEvents: "none",
                    }}>
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 0 Q${position.width / 2} 0 ${
                                position.width / 2
                            } ${position.height / 2} Q${position.width / 2} ${
                                position.height
                            } ${position.width} ${position.height} m0 0 Z`}
                            stroke={borderColor}
                            strokeWidth={borderWidth}
                            fill="none"
                        />
                    </svg>
                </div>
            ) : (
                <div
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                        pointerEvents: "none",
                    }}>
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 0 Q${position.width / 2} 0 ${
                                position.width / 2
                            } ${position.height / 2} Q${position.width / 2} ${
                                position.height
                            } ${position.width} ${position.height} m0 0 Z`}
                            stroke={borderColor}
                            strokeWidth={borderWidth}
                            fill="none"
                        />
                    </svg>
                </div>
            )}
        </>
    );
}
