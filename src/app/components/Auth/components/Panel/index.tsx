import React from 'react';
import * as S from './style';
import Logo from '@/components/Logo';
import Visibility from '@/components/Visibility';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getCookie, isValidEmail, removeCookie, setCookie } from '@/utils';
import { Input } from '@/components/Controls';
import Button, { EAppearance, EColor } from '@/components/Button';
import Icon from '@/components/Icon';
import ArrowLeftIcon from '@/assets/icons/arrowLeft.svg';
import GoogleIcon from '@/assets/logos/google.svg';
import YandexIcon from '@/assets/logos/yandex.svg';
import { useAppDispatch } from '@/store/hooks';
import {
  getCode as getCodeBase,
  validateCode,
  setToken,
  getOAuth,
  EOAuth,
} from '@/store/slices/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import InfoPanel, { EType as EPanelType } from '@/components/Panel';
import Hotkey, { EHotkeys } from '@/components/Hotkey';
import LoadingIcon from '@/assets/icons/loading.svg';
import ReloadIcon from '@/assets/icons/reload.svg';
import Timer, { Circle } from '@/components/Timer';
import FlipNumber from '@/components/FlipNumber';
import { useTranslations } from '@/hooks';
import { setLoading } from '@/store/slices/ui';

const TIMER_DURATION = 60;

const Panel = () => {
  const t = useTranslations();

  const searchParams = useSearchParams();

  const [loaders, setLoadersState] = React.useState<{
    submit?: boolean;
    code?: boolean;
  }>({});
  const [error, setError] = React.useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [timer, setTimer] = React.useState<
    { start: string; duration: number } | undefined
  >();

  const setLoaders = (data) => {
    setLoadersState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const dispatch = useAppDispatch();

  const runCountdown = (data) => {
    data = {
      start: new Date().toISOString(),
      ...data,
    };

    setCookie('timer', JSON.stringify(data));

    setTimer({
      start: data.start,
      duration: TIMER_DURATION,
    });
  };

  const [stepNumber, setStep] = React.useState(0);
  const steps = [
    {
      form: useForm({
        mode: 'all',
        resolver: yupResolver(
          yup.object({
            email: yup
              .string()
              .required(t('errors.field.required'))
              .test('validate', t('errors.field.validate.email'), isValidEmail),
          })
        ),
        defaultValues: {
          email: '',
        },
      }),
      fields: [
        {
          name: 'email',
          placeholder: 'example@email.com',
          label: t('common.email'),
          autoFocus: true,
        },
      ],
      button: {
        text: t('Home.auth.panel.code.send'),
      },
    },
    {
      panel: t('Home.auth.panel.code.sent'),
      form: useForm({
        mode: 'all',
        resolver: yupResolver(
          yup.object({
            code: yup.string().required(t('errors.field.required')),
          })
        ),
        defaultValues: {
          code: '',
        },
      }),
      fields: [
        {
          name: 'code',
          label: t('common.code'),
          autoFocus: true,
        },
      ],
      button: {
        text: t('common.login'),
      },
    },
  ];

  const getCode = (data) => {
    setLoaders({
      code: true,
    });

    return dispatch(getCodeBase(data))
      .then((response) => {
        if (response.error) {
          setError(t([`errors.${response.error.code}`, 'errors.system']));
        } else {
          runCountdown(data);
        }

        return response;
      })
      .finally(() => {
        setLoaders({
          code: false,
        });
      });
  };

  const handleSubmit = (values) => {
    setError('');

    setLoaders({
      submit: true,
    });

    if (stepNumber === 0) {
      getCode(values)
        .then((response) => {
          if (response.error) {
            return;
          }

          setStep((prev) => ++prev);
        })
        .finally(() => {
          setLoaders({
            submit: false,
          });
        });

      return;
    }

    if (stepNumber === 1) {
      dispatch(
        validateCode({
          email: steps[0].form.getValues().email,
          code: values.code,
        })
      )
        .unwrap()
        .then((response) => {
          if (!response.accessToken) {
            throw response;
          }

          dispatch(setLoading(true));
          removeCookie('timer');
          dispatch(setToken(response.accessToken));

          router.push('/dashboard');
        })
        .catch((error) => {
          setError(t([`errors.${error.code}`, 'errors.system']));
        })
        .finally(() => {
          setLoaders({
            submit: false,
          });
        });
    }
  };

  const step = steps[stepNumber];

  const { formState } = step.form;
  const { isValid } = formState;

  React.useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      dispatch(setToken(token));
      router.replace('/dashboard');

      return;
    }

    if (error) {
      setError(t([`errors.${error}`, 'errors.system']));
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('token');
    newSearchParams.delete('error');
    const newSearchParamsString = newSearchParams.toString();

    const currentHash = window.location.hash;

    let nextPath = pathname;
    if (newSearchParamsString) {
      nextPath += `?${newSearchParamsString}`;
    }
    nextPath += currentHash;

    router.replace(nextPath);
  }, []);

  React.useEffect(() => {
    const storageTimer = getCookie('timer')
      ? JSON.parse(getCookie('timer')!)
      : null;

    if (!storageTimer) {
      return;
    }

    const date = +new Date(storageTimer.start);
    const currentDate = +new Date();
    const difference = (currentDate - date) / 1000;

    if (difference >= TIMER_DURATION) {
      removeCookie('timer');

      return;
    }

    runCountdown(storageTimer);
    steps[0].form.setValue('email', storageTimer.email, {
      shouldValidate: true,
    });
    setStep(1);
  }, []);

  const handleOAuth = React.useCallback(
    (provider) => {
      setLoaders({
        [provider]: true,
      });
      dispatch(
        getOAuth({
          provider,
        })
      )
        .unwrap()
        .then((response) => {
          if (!response.url) {
            throw response;
          }

          window.location.href = response.url;
        })
        .catch((error) => {
          setError(t([`errors.${error.code}`, 'errors.system']));
          setLoaders({
            [provider]: false,
          });
        });
    },
    [dispatch, t]
  );

  return (
    <Visibility>
      {(props) => (
        <S.Wrapper
          {...props}
          ref={props.ref as React.RefObject<HTMLDivElement>}
        >
          <Logo withLabel />
          <S.Title>{t('Home.auth.panel.title')}</S.Title>
          <S.Text>{t('Home.auth.panel.text')}</S.Text>
          {step.panel && <InfoPanel>{step.panel}</InfoPanel>}
          <FormProvider {...step.form}>
            {step.fields.map((item) => (
              <Input key={item.name} {...item} />
            ))}
            {error && <InfoPanel type={EPanelType.ERROR}>{error}</InfoPanel>}

            <Timer start={timer?.start} duration={timer?.duration}>
              {(data) => {
                const seconds = Math.ceil(data?.seconds?.left || 0);

                return (
                  <>
                    <S.Controls>
                      {stepNumber > 0 && (
                        <Button
                          disabled={!!seconds}
                          onClick={() => {
                            setError('');
                            setStep((prev) => --prev);

                            steps
                              .slice(stepNumber, steps.length)
                              .forEach((step) => {
                                step.form.reset();
                              });
                          }}
                          appearance={EAppearance.GHOST}
                        >
                          <Icon style={{ width: 24 }} as={ArrowLeftIcon} />
                          {t('common.back')}
                        </Button>
                      )}
                      <S.Submit
                        disabled={loaders.submit || !isValid}
                        onClick={step.form.handleSubmit(handleSubmit)}
                      >
                        <Hotkey value={EHotkeys.ENTER} />
                        {loaders.submit ? (
                          <Icon as={LoadingIcon} />
                        ) : (
                          step.button.text
                        )}
                      </S.Submit>
                    </S.Controls>
                    {stepNumber === 1 && (
                      <S.Resend>
                        {!!seconds ? (
                          <>
                            {t('Home.auth.panel.code.resendAfter')}
                            <S.ResendSecond>
                              <Circle {...data} />
                              <FlipNumber>{seconds}</FlipNumber>
                            </S.ResendSecond>
                            {t('common.sec')}
                          </>
                        ) : (
                          <Button
                            appearance={EAppearance.GHOST}
                            disabled={loaders.code}
                            onClick={() => {
                              getCode(steps[0].form.getValues());
                            }}
                          >
                            {loaders.code ? (
                              <Icon as={LoadingIcon} />
                            ) : (
                              <>
                                <Icon style={{ width: 24 }} as={ReloadIcon} />
                                {t('Home.auth.panel.code.resend')}
                              </>
                            )}
                          </Button>
                        )}
                      </S.Resend>
                    )}
                  </>
                );
              }}
            </Timer>
          </FormProvider>
          <S.Deliver>
            <S.DeliverInner>
              {t('Home.auth.panel.social.deliver')}
            </S.DeliverInner>
          </S.Deliver>
          <Button
            appearance={EAppearance.GHOST}
            wide
            color={EColor.GREEN}
            disabled={loaders[EOAuth.GOOGLE]}
            onClick={() => {
              handleOAuth(EOAuth.GOOGLE);
            }}
          >
            {loaders[EOAuth.GOOGLE] ? (
              <Icon as={LoadingIcon} />
            ) : (
              <>
                <Icon style={{ width: 20 }} as={GoogleIcon} />
                {t('Home.auth.panel.social.google')}
              </>
            )}
          </Button>
          <Button
            appearance={EAppearance.GHOST}
            wide
            color={EColor.RED}
            disabled={loaders[EOAuth.YANDEX]}
            onClick={() => {
              handleOAuth(EOAuth.YANDEX);
            }}
          >
            {loaders[EOAuth.YANDEX] ? (
              <Icon as={LoadingIcon} />
            ) : (
              <>
                <Icon style={{ width: 20 }} as={YandexIcon} />
                {t('Home.auth.panel.social.yandex')}
              </>
            )}
          </Button>
        </S.Wrapper>
      )}
    </Visibility>
  );
};

export default Panel;
