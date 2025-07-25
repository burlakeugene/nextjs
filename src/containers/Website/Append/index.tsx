import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from '@/hooks';
import { Input, Switch } from '@/components/Controls';
import Button, {
  EAppearance as EButtonAppearance,
  ESize as EButtonSize,
} from '@/components/Button';
import Icon from '@/components/Icon';
import LoadingIcon from '@/assets/icons/loading.svg';
import { isValidURL } from '@/utils';
import { useAppDispatch } from '@/store/hooks';
import { appendWebsite, TWebsite } from '@/store/slices/dashboard';
import Panel, { EType as EPanelType } from '@/components/Panel';
import Hotkey, { EHotkeys } from '@/components/Hotkey';
import * as S from './style';

type TProps = {
  onSubmit?: (data: TWebsite) => void;
  onCancel?: () => void;
};

const Append = React.memo<TProps>(({ onSubmit, onCancel }) => {
  const t = useTranslations();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(
      yup.object({
        domain: yup
          .string()
          .required(t('errors.field.required'))
          .test('validate', t('errors.field.validate.url'), isValidURL),
        isArticleGenerationEnabled: yup.boolean(),
        isIndexingEnabled: yup.boolean(),
        isChildren: yup.boolean(),
      })
    ),
    defaultValues: {
      domain: '',
      isArticleGenerationEnabled: true,
      isIndexingEnabled: true,
      isChildren: false,
    },
  });

  const { formState } = form;
  const { isValid } = formState;

  const handleSubmit = React.useCallback((values) => {
    setLoading(true);
    setError('');

    dispatch(appendWebsite(values))
      .unwrap()
      .then((response) => {
        onSubmit?.(response);
      })
      .catch((error) => {
        setError(t([`errors.${error.code}`, 'errors.system']));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <S.Wrapper>
      <FormProvider {...form}>
        {error && <Panel type={EPanelType.ERROR}>{error}</Panel>}
        <S.Switchers>
          <Switch name="isArticleGenerationEnabled">
            {t('Dashboard.append.fields.isArticleGenerationEnabled.label')}
          </Switch>
          <Switch name="isIndexingEnabled">
            {t('Dashboard.append.fields.isIndexingEnabled.label')}
          </Switch>
          <Switch name="isChildren">
            {t('Dashboard.append.fields.isChildren.label')}
          </Switch>
        </S.Switchers>
        <Input
          label={t('Dashboard.append.fields.domain.label')}
          placeholder={t('Dashboard.append.fields.domain.placeholder')}
          name="domain"
          autoFocus
        />
        <S.Buttons>
          {onCancel && (
            <Button
              size={EButtonSize.SMALL}
              appearance={EButtonAppearance.GHOST}
              onClick={onCancel}
            >
              {t('common.cancel')}
            </Button>
          )}
          <Button
            size={EButtonSize.SMALL}
            disabled={loading || !isValid}
            onClick={form.handleSubmit(handleSubmit)}
          >
            <Hotkey value={EHotkeys.ENTER} />
            {loading ? <Icon as={LoadingIcon} /> : t('common.add')}
          </Button>
        </S.Buttons>
      </FormProvider>
    </S.Wrapper>
  );
});

Append.displayName = 'Append';

export default Append;
