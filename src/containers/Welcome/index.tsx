import React from 'react';
import * as S from './style';
import { useTranslations } from '@/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import LoadingIcon from '@/assets/icons/loading.svg';
import { updateProfile } from '@/store/slices/auth';
import Panel, { EType as EPanelType } from '@/components/Panel';
import Hotkey, { EHotkeys } from '@/components/Hotkey';

type TProps = {
  onSubmit?: () => void;
};
const Welcome = React.memo<TProps>(({ onSubmit }) => {
  const t = useTranslations();
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const dispatch = useAppDispatch();

  const defaultValues = React.useMemo(
    () => ({
      firstName: auth.data?.firstName || '',
      lastName: auth.data?.lastName || '',
    }),
    [auth]
  );

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required(t('errors.field.required')),
        lastName: yup.string().required(t('errors.field.required')),
      })
    ),
    defaultValues,
  });

  const { formState } = form;
  const { isValid } = formState;

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    (values) => {
      setError('');
      setLoading(true);

      dispatch(updateProfile(values))
        .unwrap()
        .then(() => {
          onSubmit?.();
        })
        .catch((error) => {
          setError(t([`errors.${error.code}`, 'errors.system']));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, onSubmit, t]
  );

  return (
    <S.Wrapper>
      <S.Title>{t('Welcome.title')}</S.Title>
      <S.Text>{t('Welcome.text')}</S.Text>
      <FormProvider {...form}>
        <S.Controls>
          <S.Input autoFocus label={t('common.firstName')} name="firstName" />
          <S.Input label={t('common.lastName')} name="lastName" />
        </S.Controls>
        {error && <Panel type={EPanelType.ERROR}>{error}</Panel>}
        <Button
          disabled={loading || !isValid}
          onClick={form.handleSubmit(handleSubmit)}
        >
          <Hotkey value={EHotkeys.ENTER} />
          {loading ? <Icon as={LoadingIcon} /> : t('common.continue')}
        </Button>
      </FormProvider>
    </S.Wrapper>
  );
});

Welcome.displayName = 'Welcome';

export default Welcome;
