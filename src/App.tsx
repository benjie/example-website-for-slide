import "./App.css";
import { FC } from "react";

const BUILD = {
  id: 1,
  name: "2019 Work Rig",
  componentsList: [
    {
      componentType: "CPU",
      selectionsList: [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: "Ryzen 3",
            avatarUrl: "http://placekitten.com/50/50",
            bestPrice: "£300",
            rating: 4.3,
            alternativesList: [
              {
                weight: 0.785,
                product: {
                  id: 1,
                  name: "ThreadRipper",
                  avatarUrl: "http://placekitten.com/g/50/50",
                  bestPrice: "£800",
                  rating: 4.98,
                },
              },
            ],
          },
        },
      ],
    },
  ],
};

export default function App() {
  return (
    <main>
      <Header />
      <Bar />
      <div className="lr">
        <PartsList />
        <Build />
      </div>
    </main>
  );
}

const Header: FC = () => {
  return (
    <div className="header">
      <Logo />
      <FG />
      <User />
      <Region />
      <DarkMode />
    </div>
  );
};

const Logo: FC = () => <div className="logo">Picker of PC Parts</div>;
const User: FC = () => <div className="user">@Benjie</div>;
const Region: FC = () => <div className="region">🇬🇧 GB</div>;
const DarkMode: FC = () => <div className="darkMode">Dark mode</div>;

/** Flex grow */
const FG: FC = () => <div className="fg" />;

const Bar: FC = () => {
  return <div className="bar">Bar</div>;
};

const PartsList: FC = () => {
  return (
    <div className="partsList">
      <h3>Builds list</h3>
      <PartsListTable />
    </div>
  );
};

const PartsListTable: FC = () => {
  return (
    <div className="partsListTable">
      <PartsListItem>2023 Work Rig</PartsListItem>
      <PartsListItem selected>{BUILD.name}</PartsListItem>
      <PartsListItem>Home Server</PartsListItem>
      <PartsListItem>PC for Granny</PartsListItem>
    </div>
  );
};

const PartsListItem: FC<{ selected?: boolean }> = ({ children, selected }) => {
  return (
    <div className={`partsListItem ${selected ? " selected" : ""}`}>
      {children}
    </div>
  );
};

const Build: FC = () => {
  return (
    <div className="build">
      <h1>{BUILD.name}</h1>
      <ComponentTable />
    </div>
  );
};

const ComponentTable: FC = () => {
  return (
    <div className="componentTable">
      <ComponentRow
        component={<CH>Component</CH>}
        selection={<CH>Selection</CH>}
        price={<CH>Price</CH>}
      />
      {BUILD.componentsList.map((c) => (
        <Component c={c} />
      ))}
    </div>
  );
};

const ComponentRow: FC<{
  component: JSX.Element;
  selection: JSX.Element;
  price: JSX.Element;
}> = ({ component, selection, price }) => {
  return (
    <div className="componentRow">
      <div className="componentRowComponent">{component}</div>
      <div className="componentRowSelectionAndPrice">
      <div className="componentRowSelection">{selection}</div>
      <div className="componentRowPrice">{price}</div>
        </div>
    </div>
  );
};

const Component: FC = ({ c }) => {
  return (
    <div>
      <ComponentRow
        component={c.componentType}
        selection={
          c.selectionsList.length ? (
            <div>
              {c.selectionsList.map((s) => (
                <Selection s={s} />
              ))}
            </div>
          ) : (
            <div>+ button</div>
          )
        }
        price={
          c.selectionsList.length ? (
            <div>{c.selectionsList.map((s) => s.product.bestPrice)}</div>
          ) : (
            <div />
          )
        }
      />
    </div>
  );
};

const Selection: FC = ({ s }) => {
  return (
    <div>
      <div>
      {s.quantity}x <img src={s.product.avatarUrl} /> {s.product.name}{" "}
      {s.product.rating}/5
        </div>
      {s.product.alternativesList?.length ? <Alternatives alts={s.product.alternativesList}/> : null}
    </div>
  );
};

const Alternatives: FC = ({ alts }) => {
  return <div className="alternatives">
    Alternatives:<br />
    <div className="alternativesList">
    {alts.map(alt => <Alt alt={alt} />)}
    </div>
  </div>
}

const Alt: FC = ({alt}) => {
  return <div className="alternative">
    <div className="avatar"><img src={alt.product.avatarUrl} /></div>
    <div className="detail">
      <div className="detailName">
    {alt.product.name}</div>
      <div className="detailPrice">
    {alt.product.bestPrice}</div>
      
    </div>
  </div>
}
const CH: FC = ({ children }) => {
  return <span className="ch">{children}</span>;
};
