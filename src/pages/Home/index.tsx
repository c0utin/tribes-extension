import React, {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import Icon from '../../components/Icon';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { useRequests } from '../../reducers/requests';
import { PluginList } from '../../components/PluginList';
import PluginUploadInfo from '../../components/PluginInfo';
import { ErrorModal } from '../../components/ErrorModal';

export default function Home(): ReactElement {
  const requests = useRequests();
  const navigate = useNavigate();

  const firstGraphqlRequest = requests.find((r) => r.url.includes('graphql'));
  const [error, showError] = useState('');

  return (
    <div className="flex flex-col gap-4 py-4 overflow-y-auto bg-fourfh h-full">
      {error && <ErrorModal onClose={() => showError('')} message={error} />}
      <div className="flex flex-col flex-nowrap justify-center gap-2 mx-4">
        <NavButton fa="fa-solid fa-list" onClick={() => navigate('/history')}>
          History
        </NavButton>
        <NavButton fa="fa-solid fa-gear" onClick={() => navigate('/options')}>
          Options
        </NavButton>
      </div>

      <button onClick={() => navigate('/requests')}>
        <span>we gucci</span>
        <span>{`(${requests.length})`}</span>
      </button>
    </div>
  );
}

function NavButton(props: {
  fa: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  disabled?: boolean;
}): ReactElement {
  return (
    <button
      className={classNames(
        'flex flex-row flex-nowrap items-center justify-center',
        'text-white rounded px-2 py-1 gap-1',
        {
          'bg-primary/[.8] hover:bg-primary/[.7] active:bg-primary':
            !props.disabled,
          'bg-primary/[.5]': props.disabled,
        },
        props.className,
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon className="flex-grow-0 flex-shrink-0" fa={props.fa} size={1} />
      <span className="flex-grow flex-shrink w-0 flex-grow font-bold">
        {props.children}
      </span>
    </button>
  );
}
