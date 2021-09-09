import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const variantColours = {
  "on-sale": COLORS.primary,
  "new-release": COLORS.secondary,
  default: COLORS.white,
};

const variantText = {
  "on-sale": "Sale",
  "new-release": "Just Released!",
  default: "",
};

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color": variant === "on-sale" ? COLORS.gray[700] : undefined,
              "--text-decoration": variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
        {variant !== "default" ? <Label theme={variant}>{variantText[variant]}</Label> : null}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  border-radius: 5px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;
const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.p`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Label = styled.span`
  font-weight: ${WEIGHTS.medium};
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  background-color: ${(props) => variantColours[props.theme]};
  border-radius: 2px;
`;

export default ShoeCard;
