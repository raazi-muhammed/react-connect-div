import React, { ReactNode } from "react";

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
    borderWidth = 4,
    zIndex = 1,
    borderColor = "grey",
    borderRadius = 40,
    children,
}: {
    to: string;
    from: string;
    container?: string;
    refreshWhen?: any;
    borderWidth?: number;
    borderRadius?: number;
    zIndex?: number;
    borderColor?: string;
    children?: ReactNode;
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

    const SvgLine: JSX.Element = (
        <svg
            width={position.width}
            height={position.height}
            transform={`scale(1, ${
                (position.height + borderWidth) / position.height
            })`}
            viewBox={`0 0 100% 100%`}>
            <path
                d={`M 0 ${borderWidth / 2} H ${Math.max(
                    0,
                    position.width / 2 - borderRadius
                )} C ${position.width / 2} ${borderWidth / 2} ${
                    position.width / 2
                } 0 ${position.width / 2} ${Math.min(
                    position.height / 2 + borderWidth / 2,
                    borderRadius
                )} V ${Math.max(
                    position.height / 2,
                    position.height - borderRadius + borderWidth
                )} C ${position.width / 2} ${position.height} ${
                    position.width / 2
                } ${position.height - borderWidth / 2} ${Math.min(
                    position.width / 2 + borderRadius,
                    position.width
                )} ${position.height - borderWidth / 2} H ${position.width} M ${
                    position.width
                } ${position.height - borderWidth / 2} Z`}
                stroke={borderColor}
                strokeWidth={borderWidth}
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );

    const Children: JSX.Element = (
        <div
            style={{
                bottom: 0,
                right: 0,
                left: 0,
                top: 0,
                position: "absolute",
                display: "grid",
                height: "100%",
                width: "100%",
                placeItems: "center",
            }}>
            {children}
        </div>
    );

    return (
        <>
            {origin == OriginTypes.BOTTOM_LEFT ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                        pointerEvents: "none",
                        transform: "scale(-1,1)",
                        zIndex: zIndex,
                    }}>
                    {SvgLine}
                    {Children}
                </div>
            ) : origin == OriginTypes.TOP_RIGHT ? (
                <div
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x - position.width}px`,
                        position: "absolute",
                        pointerEvents: "none",
                        transform: "scale(-1,1)",
                        zIndex: zIndex,
                    }}>
                    {SvgLine}
                    {Children}
                </div>
            ) : origin == OriginTypes.BOTTOM_RIGHT ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x - position.width}px`,
                        position: "absolute",
                        pointerEvents: "none",
                        zIndex: zIndex,
                    }}>
                    {SvgLine}
                    {Children}
                </div>
            ) : (
                <div
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                        pointerEvents: "none",
                        zIndex: zIndex,
                    }}>
                    {SvgLine}
                    {Children}
                </div>
            )}
        </>
    );
}
